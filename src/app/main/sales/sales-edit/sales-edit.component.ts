import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Sales } from '../sales.model';
import { SalesService } from '../sales.service';
import { Product } from '../../products/products.model';
import { ProductCategories } from 'src/app/shared/shared.model';

import * as SalesActions from '../store/sales.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) salesForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Sales;

  products: Product[] = [];
  productCategories: ProductCategories[] = [];

  price: number = 0;

  constructor(
    private salesService: SalesService,
    private store: Store<fromApp.AppState>,
  ) {
    this.products = this.salesService.products;
    this.productCategories = this.salesService.productCategories;
    this.groupByCategory = this.groupByCategory.bind(this);
  }

  ngOnInit(): void {
    // With state management
    this.subscription = this.store.select('sales').subscribe(stateData => {
      console.log('EDITING_START',stateData)
      if (stateData.editedSaleIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedSale[0];
        this.salesForm.setValue({
          prodId: this.editedItem.productId,
          quantity: this.editedItem.quantity,
          price: this.editedItem.price
        })
      } else {
        this.editMode = false;
      }
    });

    /*
     With service method
     this.subscription = this.salesService.startedEditing.subscribe(
       (productId: number) => {
         this.editedItemIndex = productId;
         this.editMode = true;
         this.editedItem = this.salesService.getSale(productId)[0];
         /* this.store.select('sales').subscribe(sale => {
           this.editedItem = sale.sales.filter(el => {
             return el.productId == productId;
           })[0];
         }); * /

         this.salesForm.setValue({
           prodId: this.editedItem.productId,
           quantity: this.editedItem.quantity,
           price: this.editedItem.price
         })

       }
     ); */
    this.productCategories = this.salesService.productCategories;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSale = new Sales({
      productId: Number(value.prodId),
      quantity: Number(value.quantity),
      price: Number(value.price),
      subTotal: Number(value.quantity * value.price),
    });
    if (this.editMode) {
      // this.salesService.updateSale(this.editedItemIndex, newSale);
      this.store.dispatch(new SalesActions.SalesUpdated(newSale))
    } else {
      // this.salesService.addSales(newSale);
      this.store.dispatch(new SalesActions.SalesAdded(newSale));
    }
    this.editMode = false;
    form.reset();
  }

  onProdChange(val) {
    console.log(val);
    let tempProducts = this.products;
    tempProducts.forEach(el => {
      if (el.productId == val.productId) {
        this.price = el.price;
      }
    });
  }

  onClear() {
    this.salesForm.reset();
    this.editMode = false;
    this.store.dispatch(new SalesActions.EditingStopped());
  }

  onDelete() {
    // this.salesService.deleteSale(this.editedItemIndex);
    this.store.dispatch(new SalesActions.SalesDeleted());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new SalesActions.EditingStopped());
  }

  groupByCategory(item): string {
    console.log('groupByCategory', item);
    console.log('groupByCategory', this.productCategories);
    for (let i = 0; i < this.productCategories.length; i++) {
      if (this.productCategories[i].productCatId == item.productCatId) {
        return this.productCategories[i].productCatName.toString();
      }
    }
    return "";
  }

}

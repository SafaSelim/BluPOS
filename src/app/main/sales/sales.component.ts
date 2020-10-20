import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { Sales } from './sales.model';
import { SalesService } from './sales.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../products/products.model';
import { ProductsService } from '../products/products.service';

import * as fromSales from '../sales/store/sales.reducer';
import * as salesActions from '../sales/store/sales.actions';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
  sales: Sales[] = [];
  sales_new: Observable<{ sales: Sales[] }>;
  salesChangeSub: Subscription;
  products: Product[] = [];
  totalAmount: number = 0;
  taxAmount: number;


  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private store: Store<fromSales.AppState>,
  ) {
    this.products = this.salesService.products;
    this.sales = this.salesService.getSales();
    this.totalAmount = this.calculateTotalAmount(this.sales);
    this.taxAmount = this.totalAmount * (18 / 100);
  }

  ngOnInit(): void {
    this.sales_new = this.store.select('sales');

    this.salesChangeSub = this.sales_new.subscribe(el=> {
      this.totalAmount = this.calculateTotalAmount(el.sales);
      this.taxAmount = this.totalAmount * (18 / 100);
    })

  /*   this.sales = this.salesService.getSales();
    this.salesChangeSub = this.salesService.salesChanged.subscribe(
      (sales: Sales[]) => {
        this.sales = sales;
        console.log(this.sales);
        /*this.sales = this.sales.filter(el => {
          return el.invoiceId == null || el.invoiceId == undefined;
        }) *
        this.totalAmount = this.calculateTotalAmount(this.sales);
        this.taxAmount = this.totalAmount * (18 / 100);
      }
    ); */

  }

  calculateTotalAmount(sales: Sales[]): number {
    let totalAmount: number = 0;
    for (let i = 0; i < sales.length; i++) {
      totalAmount += sales[i].subTotal;
    }
    return totalAmount;
  }

  ngOnDestroy(): void {
    this.salesChangeSub.unsubscribe();
  }

  onEditProductItem(index: number) {
    // this.salesService.startedEditing.next(index);
    this.store.dispatch(new salesActions.EditingStarted(index));
  }

}

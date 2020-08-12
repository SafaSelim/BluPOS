import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Sales } from '../sales.model';
import { SalesService } from '../sales.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) salesForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Sales;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.subscription = this.salesService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.salesService.getSale(index);
        this.salesForm.setValue({
          prodId: this.editedItem.productId,
          quantity: this.editedItem.quantity,
          price: this.editedItem.price
        })

      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSale = new Sales({
      product_id: value.prodId,
      quantity: value.quantity,
      price: value.price,
      sub_total: (value.quantity * value.price),
    });
    if (this.editMode) {
      this.salesService.updateSale(this.editedItemIndex, newSale)
    } else {
      this.salesService.addSales(newSale);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.salesForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.salesService.deleteSale(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CheckoutService } from './checkout.service';
import { Customer } from '../../customers/customers.model'
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CustomersService } from '../../customers/customers.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('checkoutForm', { static: false }) checkoutForm: NgForm;
  @Input() totalAmount: number = 0;
  @Input() taxAmount: number = 0;

  subscription: Subscription;

  customers: Customer[] = [];
  paymentTypes;

  constructor(
    private checkoutService: CheckoutService,
    private salesService: SalesService,
  ) {
    this.customers = this.salesService.customers;
    console.log( this.customers);
    this.paymentTypes = [{ "id": 1, "name": "Cash" }, { "id": 2, "name": "Credit Card" },];
    this.customers.map( el=> {
      el.fullName = el.firstName + " " + el.lastName;
      return el;
    });
  }

  ngOnInit(): void {
    /*    this.subscription = this.salesService.startedEditing.subscribe(
         (productId: number) => {
           this.editedItemIndex = productId;
           this.editMode = true;
           this.editedItem = this.salesService.getSale(productId)[0];
           this.salesForm.setValue({
             prodId: this.editedItem.productId,
             quantity: this.editedItem.quantity,
             price: this.editedItem.price
           })

         }
       ); */
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const body = {
      customerId: Number(value.customerId),
      paymentType: Number(value.paymentType),
    };
    this.checkoutService.confirmSale(body, this.totalAmount);
    form.reset();
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}

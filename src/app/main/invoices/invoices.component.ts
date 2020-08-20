import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoicesService } from './invoices.service';

import { Invoice } from './invoices.model';
import { ProductsService } from '../products/products.service';
import { Users } from '../../shared/shared.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Customer } from '../customers/customers.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  subscription: Subscription;

  users: Users[] = [];
  paymentTypes: any[] = [];
  customers: Customer[] = [];

  constructor(
    private invoicesService: InvoicesService,
    private productsService: ProductsService,
    private dataStorageService: DataStorageService,
  ) {

    this.paymentTypes = [
      { "id": 1, "name": "Cash"},
      { "id": 2, "name": "Credit Card"},
    ];
    this.users = this.dataStorageService.users;
    this.customers = this.dataStorageService.customers;
  }

  ngOnInit(): void {
    this.subscription = this.invoicesService.invoicesChanged.subscribe(
      (invoices: Invoice[]) => {
        this.invoices = invoices;
      }
    )
    this.invoices = this.invoicesService.getInvoices();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDetails(invoiceId: number) {
    console.log(invoiceId);
  }
}

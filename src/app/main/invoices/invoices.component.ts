import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoicesService } from './invoices.service';

import { Invoice } from './invoices.model';
import { Users } from '../../shared/shared.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Customer } from '../customers/customers.model';

import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { SalesService } from '../sales/sales.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  subscription: Subscription;

  users: Users[] = [];
  paymentTypes: any[] = [];
  customers: Customer[] = [];

  page = 1;
  pageSize = 10;

  current: number = -1;

  constructor(
    private invoicesService: InvoicesService,
    private dataStorageService: DataStorageService,
  ) {

    this.paymentTypes = [
      { "id": 1, "name": "Cash" },
      { "id": 2, "name": "Credit Card" },
    ];
    this.users = this.dataStorageService.users;
    this.customers = this.dataStorageService.customers;
    this.invoices = this.dataStorageService.invoices;
    this.filteredInvoices = this.invoices;
  }

  ngOnInit(): void {
    this.subscription = this.invoicesService.invoicesChanged.subscribe(
      (invoices: Invoice[]) => {
        this.invoices = invoices;
      }
    )
    this.invoices = this.invoicesService.getInvoices();
    this.filteredInvoices = this.invoices;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchEnter(value) {
    console.log(value);
    this.filteredInvoices = this.invoices;
    let filteredCustomers: Customer[] = this.customers;
    filteredCustomers = filteredCustomers.filter(el=> {
      return el.firstName.toString().toLowerCase().indexOf(value.toLowerCase()) != -1 || el.lastName.toString().toLowerCase().indexOf(value.toLowerCase()) != -1;
    });
    console.log(this.filteredInvoices, filteredCustomers);
    this.filteredInvoices = this.filteredInvoices.filter( el => {
      for(let i = 0; i < filteredCustomers.length; i++) {
        return filteredCustomers[i].customerId == el.customerId;
      }
    });
    console.log(this.filteredInvoices, filteredCustomers);
  }

  onSearchClose() {
    this.filteredInvoices = this.invoices;
  }

}

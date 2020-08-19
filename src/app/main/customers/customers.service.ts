import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../config/config';

import { Customer } from './customers.model'

@Injectable({providedIn: 'root'})
export class CustomersService {
  customersChanged = new Subject<Customer[]>();

  private customers: Customer[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getCustomers() {
    /* this.http.get(apiURL + 'api/listCust').subscribe(
      (customers: Customer[]) => {
        console.log(customers);
        this.setCustomers(customers);
      }
    ) */
    return this.customers.slice();
  }

  setCustomers(customers: Customer[]) {
    console.log("setCustomers--->",customers)
    this.customers = [];
    for( let i = 0; i< customers.length; i++ ){
      this.customers.push(new Customer(customers[i]));
    }
    this.customersChanged.next(this.customers.slice());
  }

  getCustomer(index: number) {
    return this.customers[index];
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    const body = this.customers;
   /*  this.http.post(apiURL + 'api/addCust', body).subscribe(
        response => {
          console.log('CustomersService:addCustomer-->',response);
        }
    ); */
    this.customersChanged.next(this.customers.slice());
  }

  updCustomer(index: number, newCustomer: Customer) {
    this.customers[index] = newCustomer;
    this.customersChanged.next(this.customers.slice());
  }

  deleteProduct(index: number) {
    this.customers.splice(index,1);
    this.customersChanged.next(this.customers.slice());
  }

}

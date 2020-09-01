import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../config/config';

import { Customer } from './customers.model'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  customersChanged = new Subject<Customer[]>();

  customers: Customer[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]> | Promise<Customer[]> | Customer[] {

    console.log('RouterStateSnapshot ----> ', state);
    console.log('ActivatedRouteSnapshot ----> ', route);

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllCustomers(),
      ]).then(
        () => {
          console.log('resolve ----> ', state);
          resolve();
        },
        reject
      );
    });
  }

  /**
      * Get Customers
      *
      * @returns {Promise<any>}
      */
  getAllCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      this.http.get('https://pos-system-ccbc8.firebaseio.com/customers.json')
        .subscribe((customers: Customer[]) => {

          console.log(customers);
          this.setCustomers(customers);

          this.customersChanged.next(this.customers.slice());
          resolve(customers);
        }, reject);
    });

  }


  getCustomers() {
    this.http.get('https://pos-system-ccbc8.firebaseio.com/customers.json').subscribe(
      (customers: Customer[]) => {
        console.log(customers);
        this.setCustomers(customers);
      }
    )
    return this.customers.slice();
  }

  setCustomers(customers: Customer[]) {
    console.log("setCustomers--->", customers)
    this.customers = [];
    for (let i = 0; i < customers.length; i++) {
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
    this.http.put('https://pos-system-ccbc8.firebaseio.com/customers.json', body).subscribe(
      response => {
        console.log('CustomersService:addCustomer-->', response);
      }
    );
    this.customersChanged.next(this.customers.slice());
  }

  updCustomer(index: number, newCustomer: Customer) {
    this.customers[index] = newCustomer;
    const body = this.customers;
    this.http.put('https://pos-system-ccbc8.firebaseio.com/customers.json', body).subscribe(
      response => {
        console.log('CustomersService:addCustomer-->', response);
      }
    );
    this.customersChanged.next(this.customers.slice());
  }

  deleteProduct(index: number) {
    this.customers.splice(index, 1);
    this.customersChanged.next(this.customers.slice());
  }

}

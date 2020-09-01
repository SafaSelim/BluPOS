import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../config/config';

import { Invoice } from './invoices.model'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from '../customers/customers.model';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  invoicesChanged = new Subject<Invoice[]>();

  invoices: Invoice[] = [];
  customers: Customer[] = [];

  constructor(
    private http: HttpClient,
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    console.log('RouterStateSnapshot ----> ', state);
    console.log('ActivatedRouteSnapshot ----> ', route);

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllInvoices(),
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
      * Get Invoices
      *
      * @returns {Promise<any>}
      */
     getAllInvoices(): Promise<Invoice[]> {
      return new Promise((resolve, reject) => {
        this.http.get('https://pos-system-ccbc8.firebaseio.com/invoices.json')
          .subscribe((invoices: Invoice[]) => {

            console.log(invoices);
            this.setInvoices(invoices);

            resolve(invoices);
          }, reject);
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

            resolve(customers);
          }, reject);
      });

    }

    setCustomers(customers: Customer[]) {
      console.log("setCustomers--->", customers)
      this.customers = [];
      for (let i = 0; i < customers.length; i++) {
        this.customers.push(new Customer(customers[i]));
      }
    }

  getInvoices() {
    this.http.get('https://pos-system-ccbc8.firebaseio.com/invoices.json').subscribe(
      (invoices: Invoice[]) => {
        console.log(invoices);
        this.setInvoices(invoices);
      }
    )
    return this.invoices.slice();
  }

  setInvoices(invoices: Invoice[]) {
    console.log("setInvoices--->", invoices)
    this.invoices = [];
    for (let i = 0; i < invoices.length; i++) {
      this.invoices.push(new Invoice(invoices[i]));
    }
    this.invoicesChanged.next(this.invoices.slice());
  }

  getInvoice(index: number) {
    return this.invoices[index];
  }

}

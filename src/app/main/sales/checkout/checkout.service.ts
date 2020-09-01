import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Sales } from '../sales.model';
import { Invoice } from '../../invoices/invoices.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { SalesService } from '../sales.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from '../../customers/customers.model';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  sales: Sales[] = [];
  allSales: Sales[] = [];
  invoices: Invoice[] = [];
  customers: Customer[] = [];

  constructor(
    private http: HttpClient,
    private salesService: SalesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | Promise<any[]> | any[] {

    console.log('RouterStateSnapshot ----> ', state);
    console.log('ActivatedRouteSnapshot ----> ', route);

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllCustomers(),
        this.getAllInvoices(),
        this.getAllSales(),
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
    setInvoices(invoices: Invoice[]) {
      console.log("setInvoices--->", invoices)
      this.invoices = [];
      for (let i = 0; i < invoices.length; i++) {
        this.invoices.push(new Invoice(invoices[i]));
      }
    }

    /**
      * Get Sales
      *
      * @returns {Promise<any>}
      */
     getAllSales(): Promise<Sales[]> {
      return new Promise((resolve, reject) => {
        this.http.get('https://pos-system-ccbc8.firebaseio.com/sales.json')
          .subscribe((sales: Sales[]) => {

            console.log(sales);
            this.setAllSales(sales);

            resolve(sales);
          }, reject);
      });

    }
    setAllSales(sales: Sales[]) {
      console.log("setInvoices--->", sales)
      this.allSales = [];
      for (let i = 0; i < sales.length; i++) {
        this.allSales.push(new Sales(sales[i]));
      }
    }


  confirmSale(data: any, totalAmount: number) {
    console.log(data);
    // this.invoices = this.dataStorageService.invoices;
    // this.allSales = this.dataStorageService.sales;
    this.sales = this.salesService.getSales();

    let invoiceId = this.invoices.length + 1;
    let salesId = this.allSales.length + 1;

    this.sales.forEach(el => {
      el.invoiceId = invoiceId;
      el.salesId = salesId;
      salesId++;
      el.userId = 4;
      this.allSales.push(el);
    });
    console.log(this.allSales);

    const invoiceBody: Invoice = {
      customerId: data.customerId,
      date: (new Date()).toString(),
      invoiceId: invoiceId,
      paymentType: data.paymentType,
      regUser: 4,
      totalAmount: totalAmount,
      sales: this.sales
    }

    this.invoices.push(invoiceBody);
    this.http.put('https://pos-system-ccbc8.firebaseio.com/invoices.json', this.invoices).subscribe(
      response => {
        console.log('checkout service: create invoice-->', response);
      }
    );



    this.http.put('https://pos-system-ccbc8.firebaseio.com/sales.json', this.allSales).subscribe(
      response => {
        console.log('checkout service: create sales-->', response);
      }
    );

    this.sales = [];
    this.salesService.setSales(this.sales);
  }
}

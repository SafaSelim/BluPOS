import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Sales } from '../sales.model';
import { Invoice } from '../../invoices/invoices.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { SalesService } from '../sales.service';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  sales: Sales[] = [];
  allSales: Sales[] = [];
  invoices: Invoice[] = [];

  constructor(
    private http: HttpClient,
    private dataStorageService: DataStorageService,
    private salesService: SalesService,
  ) { }


  confirmSale(data: any, totalAmount: number) {
    console.log(data);
    this.invoices = this.dataStorageService.invoices;
    this.allSales = this.dataStorageService.sales;
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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../config/config';

import { Invoice } from './invoices.model'

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  invoicesChanged = new Subject<Invoice[]>();

  private invoices: Invoice[] = [];

  constructor(
    private http: HttpClient,
  ) { }

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

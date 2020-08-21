// import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Sales } from './sales.model';
import { Product } from '../products/products.model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SalesService {
  salesChanged = new Subject<Sales[]>();
  startedEditing = new Subject<number>();

  private sales: Sales[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getSales() {
    /* this.http.get('https://pos-system-ccbc8.firebaseio.com/sales.json').pipe(take(1)).subscribe(
      (sales: Sales[]) => {
        console.log(sales);
        this.setSales(sales);
      }
    ) */

    this.sales = this.groupSales(this.sales);

    return this.sales.slice();
  }

  groupSales(array: Sales[]): Sales[] {

    var result = [];
    array.reduce((res, val) => {
      if (!res[val.productId]) {
        res[val.productId] = {
          salesId: val.salesId,
          userId: val.userId,
          invoiceId: val.invoiceId,
          productId: val.productId,
          quantity: 0,
          price: val.price,
          subTotal: val.subTotal,
        };
        result.push(res[val.productId]);
      }
      res[val.productId].quantity += val.quantity;
      res[val.productId].subTotal = res[val.productId].quantity * val.price;
      return res;
    }, {});

    return result;
  }

  setSales(sales: Sales[]) {
    console.log("setSales--->", sales)
    this.sales = [];
    for (let i = 0; i < sales.length; i++) {
      this.sales.push(new Sales(sales[i]));
    }
    this.salesChanged.next(this.sales.slice());
  }

  getSale(productId: number): Sales[] {
    // var sale: Sales = null;
    var tempSales: Sales[] = this.sales;
    return tempSales.filter(el => {
      return el.productId == productId;
    });
  }

  updateSale(productId: number, newSale: Sales) {
    // this.sales[productId] = newSale;
    for (let i = 0; i < this.sales.length; i++) {
      if(this.sales[i].productId == productId){
        this.sales[i] = newSale;
      }
    }
    this.salesChanged.next(this.sales.slice());
  }

  deleteSale(productId: number) {
    // this.sales.splice(index, 1);
    for (let i = 0; i < this.sales.length; i++) {
      if(this.sales[i].productId == productId){
        this.sales.splice(i, 1);
      }
    }
    this.salesChanged.next(this.sales.slice());
  }

  addSales(sale: Sales) {
    this.sales.push(sale);
    this.sales = this.groupSales(this.sales);
    this.salesChanged.next(this.sales.slice());
  }

  addProducts(product: Product) {
    let sale: Sales[] = [{
      salesId: null,
      userId: null,
      invoiceId: null,
      productId: product.productId,
      quantity: 1,
      price: product.price,
      subTotal: product.price,
    },]
    this.sales.push(...sale);
    console.log('sales--->', this.sales);
    this.salesChanged.next(this.sales.slice());
  }

}

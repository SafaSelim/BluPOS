// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Sales } from './sales.model';
import { Product } from '../products/products.model';

export class SalesService {
  salesChanged = new Subject<Sales[]>();
  startedEditing = new Subject<number>();

  private sales: Sales[] = [/*
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoice_id: 3,
      product_id: 4,
      quantity: 3,
      price: 3.17,
      sub_total: 3*3.17,
    }),
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoiceId: 3,
      product_id: 4,
      quantity: 7,
      price: 13.10,
      sub_total: 7*13.10,
    }),
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoice_id: 3,
      product_id: 4,
      quantity: 1,
      price: 32.10,
      sub_total: 32.10,
    }) */];

  getSales() {
    return this.sales.slice();
  }

  getSale(index: number) {
    return this.sales[index];
  }

  updateSale(index: number, newSale: Sales) {
    this.sales[index] = newSale;
    this.salesChanged.next(this.sales.slice());
  }

  deleteSale(index: number) {
    this.sales.splice(index, 1);
    this.salesChanged.next(this.sales.slice());
  }

  addSales(sale: Sales) {
    this.sales.push(sale);
    this.salesChanged.next(this.sales.slice());
  }

  addProducts(product: Product) {
    let sale: Sales[] = [{
      salesId: 5,
      userId: 2,
      invoiceId: 3,
      productId: product.productId,
      quantity: 1,
      price: product.price,
      subTotal: product.price * 1,
    },]
    this.sales.push(...sale);
    console.log('sales--->', this.sales);
    this.salesChanged.next(this.sales.slice());
  }

}

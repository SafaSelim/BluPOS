// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Sales } from './sales.model';
import { Product } from '../products/products.model';

export class SalesService {
  salesChanged = new Subject<Sales[]>();

  private sales: Sales[] = [
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoice_id: 3,
      product_id: 4,
      quantity: 5,
      price: 3.10,
      sub_total: 15.50,
    }),
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoiceId: 3,
      product_id: 4,
      quantity: 5,
      price: 3.10,
      sub_total: 15.50,
    }),
    new Sales({
      sales_id: 1,
      user_id: 2,
      invoice_id: 3,
      product_id: 4,
      quantity: 5,
      price: 3.10,
      sub_total: 15.50,
    })];

    getSales() {
      return this.sales.slice();
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
        quantity: 5 ,
        price: product.price,
        subTotal: 15.50,
      },]
       this.sales.push(...sale);
       this.salesChanged.next(this.sales.slice());
    }

}

import { Component, OnInit } from '@angular/core';

import { Sales} from './sales.model';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales: Sales[] = [
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

  constructor() { }

  ngOnInit(): void {
  }

  onProductAdded(product: Sales){
    this.sales.push(product);
  }

}

import { Component, OnInit } from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.4,
    stock: 10,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.4,
    stock: 10,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.4,
    stock: 10,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  })];

  constructor() { }

  ngOnInit(): void {
  }

}

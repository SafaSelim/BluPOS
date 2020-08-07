import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from '../product.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() productWasSelected = new EventEmitter<Product>();

  products: Product[] = [new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.9,
    stock: 3,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 2,
    product_name: "Second Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 1.4,
    stock: 10,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 3,
    product_name: "Third Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 36.4,
    stock: 1,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  })];

  constructor() { }

  ngOnInit(): void {
  }

  onProductSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

}

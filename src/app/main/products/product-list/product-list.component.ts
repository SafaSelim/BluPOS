import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
      private productsService: ProductsService,
      ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

}

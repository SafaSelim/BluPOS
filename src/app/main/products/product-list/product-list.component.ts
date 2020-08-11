import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

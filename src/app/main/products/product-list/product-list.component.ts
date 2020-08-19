import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    )
    this.products = this.productsService.getProducts();
    console.log("ProductListComponent",this.products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ProductCategories } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  collapsed = true;

  productCategories: ProductCategories[] = [];
  categoryName: string = "All Products";
  clickedCat: number = 0;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productCategories = this.productsService.productCategories;
   }

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    )
    this.products = this.productsService.getProducts();
    this.filteredProducts = this.products;
    console.log("ProductListComponent",this.products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filterByCategory(categoryId: number, categoryName: string) {
    this.filteredProducts = this.products;
    this.categoryName = categoryName || "";
    this.clickedCat = 0;
    if(categoryId != 0){
      this.filteredProducts = this.filteredProducts.filter(el => {
        this.clickedCat = categoryId;
        return el.productCatId == categoryId;
      });
    }
  }

  onAddToSales(productId: number) {
    console.log(productId)
    let product = this.productsService.getProduct(productId);
    console.log(product);
    this.productsService.addProductsToSales(product);
  }

  onSearchEnter(value) {
    console.log(value);
    this.filteredProducts = this.products;
    this.filteredProducts = this.filteredProducts.filter( el => {
      return el.productName.toString().toLowerCase().indexOf(value.toLowerCase()) != -1 || el.productCode.toString().toLowerCase().indexOf(value.toLowerCase()) != -1;
    });
  }

  onSearchClose() {
    this.filteredProducts = this.products;
  }
}

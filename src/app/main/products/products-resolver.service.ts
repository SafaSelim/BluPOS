import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Product } from './products.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private productsService: ProductsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productsService.products;

    if (products.length === 0) {
      return this.dataStorageService.fetchProducts();
    } else {
      return products;
    }
  }
}

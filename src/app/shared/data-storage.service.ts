import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiURL } from '../config/config';

import { ProductsService } from '../main/products/products.service';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { Product } from '../main/products/products.model';

@Injectable(
  { providedIn: 'root' }
)
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  /* storeProducts() {
    const products = this.productsService.getProducts();
    this.http.post(apiURL + 'api/updProduct', products).subscribe(
        response => {
          console.log('DataStorageService:storeProducts-->',response);
        }
    );
  } */

  storeProducts() {
    const products = this.productsService.getProducts();
    this.http
      .put(
        'https://pos-system-ccbc8.firebaseio.com/products.json',
        products
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchProducts() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Product[]>(
          'https://pos-system-ccbc8.firebaseio.com/products.json')
          .pipe(
          map(products => {
            console.log(products);
            return products.map(product => {
              return {
                ...product,
                // ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(products => {
            this.productsService.setProducts(products);
          })
      )
      })
      );

  }
}

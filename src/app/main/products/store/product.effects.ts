import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../products.model';
import * as ProductsActions from '../store/product.actions';

@Injectable()
export class ProductsEffects {

  @Effect()
  fetchProducts = this.actions$.pipe(
    ofType(ProductsActions.FETCH_PRODUCTS),
    switchMap(() => {
      return this.http.get<Product[]>("https://pos-system-ccbc8.firebaseio.com/products.json")
    }),
    map(products => {
      return products.map(product => new Product(product))
    }),
    map(products => {
      return new ProductsActions.SetProducts(products);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) { }
}

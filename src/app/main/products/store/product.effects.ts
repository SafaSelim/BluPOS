import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Product } from '../products.model';
import * as ProductsActions from '../store/product.actions';
import * as fromApp from '../../../store/app.reducer';

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

  @Effect()
  saveProducts = this.actions$.pipe(
    ofType(ProductsActions.PRODUCT_ADDED, ProductsActions.PRODUCT_UPDATED, ProductsActions.PRODUCT_DELETED),
    withLatestFrom(this.store.select('products')),
    switchMap(([actionData, productsState]) => {
      return this.http
      .put(
        "https://pos-system-ccbc8.firebaseio.com/products.json",
        productsState.products
        )
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
  ) { }
}

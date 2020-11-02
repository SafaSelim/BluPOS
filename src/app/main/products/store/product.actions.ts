import { Action } from "@ngrx/store";

import { Product } from "../products.model";

export const SET_PRODUCTS = '[Products] Set Products';
export const FETCH_PRODUCTS = '[Products] Fetch Products';
export const PRODUCT_ADDED = '[Products] Product Added';
export const PRODUCT_UPDATED = '[Products] Product Updated';
export const PRODUCT_DELETED = '[Products] Product Deleted';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) { }
}

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

export class ProductAdded implements Action {
  readonly type = PRODUCT_ADDED;

  constructor(public payload: Product) {}
}

export class ProductUpdated implements Action {
  readonly type = PRODUCT_UPDATED;

  constructor(public payload: {productId: number, newProduct: Product}) {}
}

export class ProductDeleted implements Action {
  readonly type = PRODUCT_DELETED;

  constructor(public payload: number) {}
}

export type ProductsActions = SetProducts | FetchProducts | ProductAdded | ProductUpdated | ProductDeleted;

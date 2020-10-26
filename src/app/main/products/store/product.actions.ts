import { Action } from "@ngrx/store";

import { Product } from "../products.model";

export const SET_PRODUCTS = '[Products] Set Products';
export const FETCH_PRODUCTS = '[Products] Fetch Products';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) { }
}

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

export type ProductsActions = SetProducts;

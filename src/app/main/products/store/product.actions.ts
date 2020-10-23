import { Action } from "@ngrx/store";

import { Product } from "../products.model";

export const SET_PRODUCTS = '[Products] Set Products';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export type ProductsActions = SetProducts;

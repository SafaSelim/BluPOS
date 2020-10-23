import { Product } from '../products.model';

import * as ProductsActions from './product.actions';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: []
}

export function productReducer(
  state = initialState,
  action: ProductsActions.ProductsActions
) {
  switch (action.type) {
    case ProductsActions.SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload]
      }
    default:
      return state;
  }
}

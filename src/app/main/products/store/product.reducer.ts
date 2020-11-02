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
    case ProductsActions.PRODUCT_ADDED:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case ProductsActions.PRODUCT_UPDATED:
      const updatedProduct = {
        ...state.products[action.payload.productId],
        ...action.payload.newProduct
      };

      const updatedProducts = [...state.products];
      updatedProducts[action.payload.productId] = updatedProduct;

      return {
        ...state,
        products: updatedProducts
      };
    case ProductsActions.PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter((product) => {
          return product.productId !== action.payload;
        })
      }
    default:
      return state;
  }
}

import { Action } from '@ngrx/store';

import { Sales } from '../sales.model';
import * as SalesActions from './sales.actions';

const initialState = {
  sales: [new Sales({
    salesId: null,
    userId: null,
    invoiceId: null,
    productId: 1,
    quantity: 1,
    price: 100,
    subTotal: 100,
  })]
}

export function salesReducer(state = initialState, action: SalesActions.SalesAdded) {
  switch (action.type) {
    case SalesActions.SALES_ADDED:
      return {
        ...state,
        sales: [...state.sales, action.payload]
      }
    default:
      return state;
  }
}

import { Action } from '@ngrx/store';

import { Sales } from '../sales.model';
import * as SalesActions from './sales.actions';

const initialState = {
  sales: [/* new Sales({
    salesId: null,
    userId: null,
    invoiceId: null,
    productId: 1,
    quantity: 1,
    price: 100,
    subTotal: 100,
  }) */]
}

export function salesReducer(state = initialState, action: SalesActions.SalesActions) {
  switch (action.type) {
    case SalesActions.SALES_ADDED:
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case SalesActions.PRODUCT_ADDED:
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case SalesActions.SALES_UPDATED:
      const sale = state.sales[action.payload.index];
      const updatedSale = {
        ...sale,
        ...action .payload.sale

      }
      const updatedSales = [...state.sales];
      updatedSales[action.payload.index] = updatedSale;
      return {
        ...state,
        sales : updatedSales
      };
    case SalesActions.SALES_DELETED:
      return {
        ...state,
        sales: state.sales.filter((sale, saleIndex) => {
          return saleIndex != action.payload;
        })
      };
    default:
      return state;
  }
}

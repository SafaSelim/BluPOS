import { Action } from '@ngrx/store';

import { Sales } from '../sales.model';
import * as SalesActions from './sales.actions';


export interface State {
  sales: Sales[];
  editedSale: Sales;
  editedSaleIndex: number;
}

export interface AppState {
  sales: State;
}

const initialState: State = {
  sales: [],
  editedSale: null,
  editedSaleIndex: -1
}

export function salesReducer(
  state: State = initialState,
  action: SalesActions.SalesActions
) {
  switch (action.type) {
    case SalesActions.SALES_ADDED:
      //IF the sales contains the same product id just combine the quantity
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case SalesActions.PRODUCT_ADDED:
      // need to make it one because its same with salesadded action
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case SalesActions.SALES_UPDATED:
      const sale = state.sales[state.editedSaleIndex];
      const updatedSale = {
        ...sale,
        ...action.payload

      }
      const updatedSales = [...state.sales];
      updatedSales[state.editedSaleIndex] = updatedSale;
      return {
        ...state,
        sales: updatedSales,
        editedSale: null,
        editedSaleIndex: -1
      };
    case SalesActions.SALES_DELETED:
      return {
        ...state,
        sales: state.sales.filter((sale, saleIndex) => {
          return saleIndex !== state.editedSaleIndex;
        }),
        editedSale: null,
        editedSaleIndex: -1
      };
    case SalesActions.EDITING_STARTED:
      return {
        ...state,
        editedSale: { ...state.sales.filter(sale => {
          return sale.productId === action.payload;
        }) },
        editedSaleIndex: action.payload
      };
    case SalesActions.EDITING_STOPPED:
      return {
        ...state,
        editedSale: null,
        editedSaleIndex: -1
      };
    default:
      return state;
  }
}

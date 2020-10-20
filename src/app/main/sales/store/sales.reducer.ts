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
      const array = [...state.sales, action.payload];

      var result = [];
      array.reduce((res, val) => {
        if (!res[val.productId]) {
          res[val.productId] = {
            salesId: val.salesId,
            userId: val.userId,
            invoiceId: val.invoiceId,
            productId: val.productId,
            quantity: 0,
            price: val.price,
            subTotal: val.subTotal,
          };
          result.push(res[val.productId]);
        }
        res[val.productId].quantity += val.quantity;
        res[val.productId].subTotal = res[val.productId].quantity * val.price;
        return res;
      }, {});

      return {
        ...state,
        sales: [...result]
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

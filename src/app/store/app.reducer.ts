import { ActionReducerMap } from '@ngrx/store';

import * as fromSales from '../main/sales/store/sales.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromProducts from '../main/products/store/product.reducer';

export interface AppState {
  sales: fromSales.State;
  auth: fromAuth.State;
  products: fromProducts.State;
};

export const appReducer: ActionReducerMap<any> = {
  sales: fromSales.salesReducer,
  auth: fromAuth.authReducer,
  products: fromProducts.productReducer,
};

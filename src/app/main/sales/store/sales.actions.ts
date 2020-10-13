import { Action } from '@ngrx/store';
import { Sales } from '../sales.model';

export const SALES_ADDED = 'SALES_ADDED';

export class SalesAdded implements Action {
  readonly type = SALES_ADDED;
  constructor(public payload: Sales) { }
}

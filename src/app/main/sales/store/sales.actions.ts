import { Action } from '@ngrx/store';
import { Product } from '../../products/products.model';
import { Sales } from '../sales.model';

export const SALES_ADDED = '[Sales] Sales Added';
// export const PRODUCT_ADDED = 'PRODUCT_ADDED';
export const SALES_UPDATED = '[Sales] Sales Updated';
export const SALES_DELETED = '[Sales] Sales Deleted';
export const EDITING_STARTED = '[Sales] Editing Started';
export const EDITING_STOPPED = '[Sales] Editing Stopped';

export class SalesAdded implements Action {
  readonly type = SALES_ADDED;
  constructor(public payload: Sales) { }
}


export class SalesUpdated implements Action {
  readonly type = SALES_UPDATED;

  constructor(public payload: Sales) { }
}

export class SalesDeleted implements Action {
  readonly type = SALES_DELETED;

  constructor() { }
}

export class EditingStarted implements Action {
  readonly type = EDITING_STARTED;

  constructor(public payload: number) { }
}

export class EditingStopped implements Action {
  readonly type = EDITING_STOPPED;
}

export type SalesActions =
  | SalesAdded
  | SalesUpdated
  | SalesDeleted
  | EditingStarted
  | EditingStopped;

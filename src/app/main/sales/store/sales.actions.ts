import { Action } from '@ngrx/store';
import { Product } from '../../products/products.model';
import { Sales } from '../sales.model';

export const SALES_ADDED = 'SALES_ADDED';
export const PRODUCT_ADDED = 'PRODUCT_ADDED';
export const SALES_UPDATED = 'SALES_UPDATED';
export const SALES_DELETED = 'SALES_DELETED';
export const EDITING_STARTED = 'EDITING_STARTED';
export const EDITING_STOPPED = 'EDITING_STOPPED';

export class SalesAdded implements Action {
  readonly type = SALES_ADDED;
  constructor(public payload: Sales) { }
}

export class ProductAdded implements Action {
  readonly type = PRODUCT_ADDED;
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
  | ProductAdded
  | SalesUpdated
  | SalesDeleted
  | EditingStarted
  | EditingStopped;

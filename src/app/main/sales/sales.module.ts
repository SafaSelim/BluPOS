import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';
import { SalesEditComponent } from './sales-edit/sales-edit.component';

@NgModule({
  declarations: [
    SalesComponent,
    SalesEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    SalesRoutingModule,
    SharedModule,
  ],
})
export class SalesModule { }

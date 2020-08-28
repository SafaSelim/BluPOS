import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomersComponent } from './customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerStartComponent } from './customer-start/customer-start.component';

import { SearchFilterModule } from '../../shared/search-filter/search-filter.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDetailComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerStartComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    NgbModule,

    SearchFilterModule
  ],
})
export class CustomersModule { }

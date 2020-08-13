import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';


import { CustomersComponent } from './customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerStartComponent } from './customer-start/customer-start.component';

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
  ],
})
export class CustomersModule { }

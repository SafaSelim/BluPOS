import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [ {
  path: '',
    component: CustomersComponent,
    children: [
    { path: '', component: CustomersComponent },
    { path: 'new', component: CustomerEditComponent },
    { path: ':id', component: CustomerDetailComponent },
    { path: ':id/edit', component: CustomerEditComponent },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class CustomersRoutingModule { }

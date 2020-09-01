import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerStartComponent } from './customer-start/customer-start.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CustomersService } from './customers.service';


const routes: Routes = [ {
  path: '',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    resolve: { data: CustomersService},
    children: [
    { path: '', component: CustomerStartComponent },
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutService } from './checkout/checkout.service';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    canActivate: [AuthGuard],
    resolve: { data: CheckoutService },
    children: [
      { path: 'checkout', component: CheckoutComponent },
    ]
  },];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SalesRoutingModule { }

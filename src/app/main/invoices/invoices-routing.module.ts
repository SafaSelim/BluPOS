import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './invoices.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { InvoicesService } from './invoices.service';


const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    resolve: { data: InvoicesService },
    canActivate: [AuthGuard],
  },];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class InvoicesRoutingModule { }

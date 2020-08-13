import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './main/invoices/invoices.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/sales', pathMatch: 'full' },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

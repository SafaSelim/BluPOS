import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { InvoicesComponent } from './main/invoices/invoices.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/sales', pathMatch: 'full' },
  { path: 'products', loadChildren: './main/products/products.module#ProductsModule' },
  { path: 'customers', loadChildren: './main/customers/customers.module#CustomersModule' },
  { path: 'sales', loadChildren: './main/sales/sales.module#SalesModule' },
  { path: 'auth', component: AuthComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

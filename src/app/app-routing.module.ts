import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  /* { path: 'products', loadChildren: './main/products/products.module#ProductsModule' },
  { path: 'customers', loadChildren: './main/customers/customers.module#CustomersModule' },
  { path: 'sales', loadChildren: './main/sales/sales.module#SalesModule' }, */
  { path: 'products', loadChildren: () => import('./main/products/products.module').then(module => module.ProductsModule) },
  { path: 'customers', loadChildren: () => import('./main/customers/customers.module').then(module => module.CustomersModule) },
  { path: 'sales', loadChildren: () => import('./main/sales/sales.module').then(module => module.SalesModule) },
  { path: 'invoices', loadChildren:() => import('./main/invoices/invoices.module').then(module => module.InvoicesModule) },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./main/products/products.module').then(module => module.ProductsModule) },
  { path: 'customers', loadChildren: () => import('./main/customers/customers.module').then(module => module.CustomersModule) },
  { path: 'sales', loadChildren: () => import('./main/sales/sales.module').then(module => module.SalesModule) },
  { path: 'invoices', loadChildren: () => import('./main/invoices/invoices.module').then(module => module.InvoicesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

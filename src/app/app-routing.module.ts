import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './main/products/products.component';
import { SalesComponent } from './main/sales/sales.component';
import { CustomersComponent } from './main/customers/customers.component';
import { InvoicesComponent } from './main/invoices/invoices.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProductStartComponent } from './main/products/product-start/product-start.component';
import { ProductDetailComponent } from './main/products/product-detail/product-detail.component';
import { ProductEditComponent } from './main/products/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
  { path: 'products', component: ProductsComponent, children: [
    { path: '', component: ProductStartComponent },
    { path: 'new', component: ProductEditComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent },
  ] },
  { path: 'sales', component: SalesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

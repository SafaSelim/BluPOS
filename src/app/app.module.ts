import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './main/products/products.component';

import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './main/products/product-list/product-list.component';
import { ProductDetailComponent } from './main/products/product-detail/product-detail.component';
import { ProductItemComponent } from './main/products/product-list/product-item/product-item.component';
import { SalesComponent } from './main/sales/sales.component';
import { InvoicesComponent } from './main/invoices/invoices.component';
import { CustomersComponent } from './main/customers/customers.component';
import { CustomerDetailComponent } from './main/customers/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    SalesComponent,
    InvoicesComponent,
    CustomersComponent,
    CustomerDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

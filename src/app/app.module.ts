import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

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
import { SalesEditComponent } from './main/sales/sales-edit/sales-edit.component';

import { DropdownDirective } from './main/shared/dropdown.directive';

import { SalesService } from './main/sales/sales.service';
import { ProductStartComponent } from './main/products/product-start/product-start.component';
import { ProductEditComponent } from './main/products/product-edit/product-edit.component';

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
    SalesEditComponent,
    DropdownDirective,
    ProductStartComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [SalesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

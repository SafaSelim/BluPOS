import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './main/shared/shared.module';
import { ProductsModule } from './main/products/products.module';
import { CustomersModule } from './main/customers/customers.module';
import { SalesModule } from './main/sales/sales.module';

import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { InvoicesComponent } from './main/invoices/invoices.component';

import { SalesService } from './main/sales/sales.service';
import { ProductsService } from './main/products/products.service';

@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    HeaderComponent,
    InvoicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ProductsModule,
    CustomersModule,
    SalesModule,

    SharedModule,
  ],
  providers: [SalesService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

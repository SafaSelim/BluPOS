import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './main/shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { InvoicesComponent } from './main/invoices/invoices.component';

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
    HttpClientModule,

    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

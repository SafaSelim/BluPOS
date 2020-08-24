import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';

import { InvoicesComponent } from './invoices.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

// import { NgMatSearchBarModule } from 'ng-mat-search-bar';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceDetailsComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    InvoicesRoutingModule,
    SharedModule,

    // NgMatSearchBarModule,
  ],
})
export class InvoicesModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';

import { InvoicesComponent } from './invoices.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchFilterModule } from '../../shared/search-filter/search-filter.module';

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

    NgbModule,

    SearchFilterModule,
  ],
})
export class InvoicesModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';

import { InvoicesComponent } from './invoices.component';

@NgModule({
  declarations: [
    InvoicesComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    InvoicesRoutingModule,
    SharedModule,
  ],
})
export class InvoicesModule { }

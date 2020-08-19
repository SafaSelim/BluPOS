import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from "./auth.component";
@NgModule({
  declarations: [
    AuthComponent,

  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule { }

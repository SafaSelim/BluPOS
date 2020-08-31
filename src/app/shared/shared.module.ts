import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetNamePipe } from './getname.pipe';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
declarations: [
  GetNamePipe,
  DropdownDirective,
  LoadingSpinnerComponent,
  AlertComponent,
],
imports: [
  CommonModule,
  FormsModule,
],
exports:[
  GetNamePipe,
  DropdownDirective,
  LoadingSpinnerComponent,
  AlertComponent,
  CommonModule,
],
})
export class SharedModule {}

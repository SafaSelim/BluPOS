import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetNamePipe } from './getname.pipe';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
declarations: [
  GetNamePipe,
  DropdownDirective,
],
imports: [
  CommonModule,
  FormsModule,
],
exports:[
  GetNamePipe,
  DropdownDirective,
  CommonModule,
],
})
export class SharedModule {}

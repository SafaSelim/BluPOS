import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetNamePipe } from './getname.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
declarations: [
  GetNamePipe,
  DropdownDirective,
],
imports: [
  CommonModule,
],
exports:[
  GetNamePipe,
  DropdownDirective,
  CommonModule,
],
})
export class SharedModule {}

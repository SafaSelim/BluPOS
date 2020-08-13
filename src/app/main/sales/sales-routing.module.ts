import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';


const routes: Routes = [
  { path: 'sales', component: SalesComponent },];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SalesRoutingModule { }

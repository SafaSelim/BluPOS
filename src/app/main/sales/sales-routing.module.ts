import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { AuthGuard } from 'src/app/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    canActivate: [AuthGuard],
  },];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SalesRoutingModule { }

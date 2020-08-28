
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SearchFilterComponent } from "./search-filter.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
/*
    //Reactive form
    ReactiveFormsModule */
  ],
  exports: [SearchFilterComponent],
  declarations: [SearchFilterComponent]
})
export class SearchFilterModule {}


import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SearchFilterComponent } from "./search-filter.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [SearchFilterComponent],
  declarations: [SearchFilterComponent]
})
export class SearchFilterModule {}

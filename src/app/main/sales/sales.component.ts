import { Component, OnInit } from '@angular/core';

import { Sales } from './sales.model';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales: Sales[];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.sales = this.salesService.getSales();
    this.salesService.salesChanged.subscribe(
      (sales: Sales[]) => {
          this.sales = sales;
      }
    )
  }

}

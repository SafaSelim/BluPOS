import { Component, OnInit, OnDestroy } from '@angular/core';

import { Sales } from './sales.model';
import { SalesService } from './sales.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
  sales: Sales[];
  salesChangeSub: Subscription;
  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.sales = this.salesService.getSales();
    this.salesChangeSub = this.salesService.salesChanged.subscribe(
      (sales: Sales[]) => {
          this.sales = sales;
      }
    )
  }

  ngOnDestroy(): void {
    this.salesChangeSub.unsubscribe();
  }

}

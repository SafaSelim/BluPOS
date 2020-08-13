import { Component, OnInit, OnDestroy } from '@angular/core';

import { Sales } from './sales.model';
import { SalesService } from './sales.service';
import { Subscription } from 'rxjs';
import { Product } from '../products/products.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
  sales: Sales[];
  salesChangeSub: Subscription;
  products: Product[] = [];

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    ) {
      this.products = this.productsService.getProducts();
     }

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

  onEditProductItem(index: number) {
    this.salesService.startedEditing.next(index);
  }

}

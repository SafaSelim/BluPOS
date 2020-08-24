import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';


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
  sales: Sales[] = [];
  salesChangeSub: Subscription;
  products: Product[] = [];
  totalAmount: number = 0;
  taxAmount: number = 0;


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
        console.log(this.sales);
        /*this.sales = this.sales.filter(el => {
          return el.invoiceId == null || el.invoiceId == undefined;
        }) */
        this.totalAmount = 0;
        for (let i = 0; i < this.sales.length; i++) {
          this.totalAmount += this.sales[i].subTotal;
        }
        this.taxAmount = this.totalAmount * (18 / 100);
      }
    );

  }

  ngOnDestroy(): void {
    this.salesChangeSub.unsubscribe();
  }

  onEditProductItem(index: number) {
    this.salesService.startedEditing.next(index);
  }

}

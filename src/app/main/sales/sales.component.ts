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
  totalAmount: number;

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

    /*     var result = [];
        this.sales.reduce((res, val) => {
          if (!res[val.productId]) {
            res[val.productId] = {
              salesId: val.salesId,
              userId: val.userId,
              invoiceId: val.invoiceId,
              productId: val.productId,
              quantity: 0,
              price: val.price,
              subTotal: val.subTotal,
            };
            result.push(res[val.productId]);
          }
          res[val.productId].quantity += val.quantity;
          res[val.productId].subTotal = res[val.productId].quantity * val.price;
          return res;
        }, {});
        console.log(result);
        this.sales = result; */

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

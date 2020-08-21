import { Component, OnInit, OnDestroy } from '@angular/core';

// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  //Modal
  // closeResult: string;

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    // private modalService: NgbModal,
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
        for(let i=0; i< this.sales.length; i++) {
          this.totalAmount += this.sales[i].subTotal;
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.salesChangeSub.unsubscribe();
  }

  onEditProductItem(index: number) {
    this.salesService.startedEditing.next(index);
  }

  //Modal
/*   openCheckout(content) {
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } */

  //Modal
  /* private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  } */

}

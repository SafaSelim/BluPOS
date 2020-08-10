import { Component, OnInit } from '@angular/core';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  selectedProduct: Product;

  constructor(private productsService: ProductsService,) { }

  ngOnInit(): void {
    this.productsService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    )
  }

}

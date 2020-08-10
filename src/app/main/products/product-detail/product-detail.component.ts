import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onAddToSales() {
    this.productsService.addProductsToSales(this.product);
  }

}

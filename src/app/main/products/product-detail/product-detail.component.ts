import { Component, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.product = this.productsService.getProduct(this.id);
      }
    )
  }

  onAddToSales() {
    this.productsService.addProductsToSales(this.product);
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.productsService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }

}

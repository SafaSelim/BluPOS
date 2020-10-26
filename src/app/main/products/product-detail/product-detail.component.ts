import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';


import * as fromApp from '../../../store/app.reducer';

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
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('products');
        }),
        map(productsState => {
          return productsState.products.find((product, index) => {
            return product.productId == this.id;
          });
        }
        )
      )
      .subscribe(product => {
        this.product = product;
      });
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

import { Product } from './products.model';
import { Injectable } from '@angular/core';
import { SalesService } from '../sales/sales.service';
import { Subject } from 'rxjs';
import { apiURL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProductsService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(
    private salesService: SalesService,
    private http: HttpClient,
    ) { }

  getProducts() {
    this.http.get(apiURL + 'api/listProduct').subscribe(
      (products: Product[]) => {
        console.log(products);
        this.setProducts(products);
      }
    )
    return this.products.slice();
  }

  setProducts(products: Product[]) {
    console.log("setProducts--->",products)
    this.products = [];
    for( let i = 0; i< products.length; i++ ){
      this.products.push(new Product(products[i]));
    }
    this.productsChanged.next(this.products.slice());
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProductsToSales(product: Product) {
    console.log('addProductsToSales', product);
    this.salesService.addProducts(product);
  }

  addProduct(product: Product) {
    this.products.push(product);
    const body = this.products;
    this.http.post(apiURL + 'api/addProduct', body).subscribe(
        response => {
          console.log('ProductsService:addProduct-->',response);
        }
    );
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index,1);
    this.productsChanged.next(this.products.slice());
  }

}

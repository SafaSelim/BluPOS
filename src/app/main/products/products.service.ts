import { Product } from './products.model';
import { Injectable } from '@angular/core';
import { SalesService } from '../sales/sales.service';
import { Subject, Observable } from 'rxjs';
import { apiURL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductCategories } from 'src/app/shared/shared.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  productsChanged = new Subject<Product[]>();

  products: Product[] = [];
  productCategories: ProductCategories[] = [];

  constructor(
    private salesService: SalesService,
    private http: HttpClient,
  ) { }




  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    console.log('RouterStateSnapshot ----> ', state);
    console.log('ActivatedRouteSnapshot ----> ', route);

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllProducts(),
        this.getProductCategories(),
      ]).then(
        () => {
          console.log('resolve ----> ', state);
          resolve();
        },
        reject
      );
    });
  }

  /**
      * Get Products
      *
      * @returns {Promise<any>}
      */
  getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get('https://pos-system-ccbc8.firebaseio.com/products.json')
        .subscribe((products: Product[]) => {

          console.log(products);
          this.setProducts(products);

          resolve(products);
        }, reject);
    });

  }
  /**
      * Get Product Categories
      *
      * @returns {Promise<ProductCategories[]>}
      */
  getProductCategories(): Promise<ProductCategories[]> {
    return new Promise((resolve, reject) => {
      this.http.get('https://pos-system-ccbc8.firebaseio.com/productCategories.json')
        .subscribe((productCats: ProductCategories[]) => {

          console.log(productCats);
          this.productCategories = [];
          for (let i = 0; i < productCats.length; i++) {
            this.productCategories.push(new ProductCategories(productCats[i]));
          }
          resolve(productCats);
        }, reject);
    });

  }


  getProducts() {
    this.http.get("https://pos-system-ccbc8.firebaseio.com/products.json").subscribe(
      (products: Product[]) => {
        console.log(products);
        this.setProducts(products);
      }
    )
    return this.products.slice();
  }



  setProducts(products: Product[]) {
    console.log("setProducts--->", products)
    this.products = [];
    for (let i = 0; i < products.length; i++) {
      this.products.push(new Product(products[i]));
    }
    this.productsChanged.next(this.products.slice());
  }

  getProduct(productId: number): Product {
    let product: Product[] = this.products;
    product = product.filter(el => {
      return el.productId == productId;
    })
    return product[0];
  }

  addProductsToSales(product: Product) {
    console.log('addProductsToSales', product);
    this.salesService.addProducts(product);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
    const body = this.products;
    console.log('ProductsService:addProduct:body-->', body)
    this.http.put("https://pos-system-ccbc8.firebaseio.com/products.json", body).subscribe(
      response => {
        console.log('ProductsService:addProduct:response-->', response);
      }
    );
  }

  updateProduct(productId: number, newProduct: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId == productId) {
        this.products[i] = newProduct;
      }
    }
    console.log('ProductsService:updateProducts:products-->', this.products);
    const body = this.products;
    console.log('ProductsService:updateProducts:body-->', body)
    this.http.put("https://pos-system-ccbc8.firebaseio.com/products.json", body).subscribe(
      response => {
        console.log('ProductsService:updateProducts:response-->', response);
      }
    );
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(productId: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId == productId) {
        this.products.splice(i, 1);
      }
    }
    console.log("ProductsService:deleteProduct:products--->", this.products);
    const body = this.products;
    console.log('ProductsService:updateProducts:body-->', body)
    this.http.put("https://pos-system-ccbc8.firebaseio.com/products.json", body).subscribe(
      response => {
        console.log('ProductsService:deleteProduct:response-->', response);
      }
    );
    // this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }

}

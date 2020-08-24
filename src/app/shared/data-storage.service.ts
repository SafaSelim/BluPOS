import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiURL } from '../config/config';

import { ProductsService } from '../main/products/products.service';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { Product } from '../main/products/products.model';
import { ProductUnits, ProductCategories, Users } from './shared.model';
import { Customer } from '../main/customers/customers.model';
import { Invoice } from '../main/invoices/invoices.model';
import { Sales } from '../main/sales/sales.model';

@Injectable(
  { providedIn: 'root' }
)
export class DataStorageService {

  products: Product[] = [];

  productUnits: ProductUnits[] = [];
  productCategories: ProductCategories[] = [];
  users: Users[] = [];
  customers: Customer[] = [];
  invoices: Invoice[] = [];
  sales: Sales[] = [];

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  /* storeProducts() {
    const products = this.productsService.getProducts();
    this.http.post(apiURL + 'api/updProduct', products).subscribe(
        response => {
          console.log('DataStorageService:storeProducts-->',response);
        }
    );
  } */

  getScript = async () => {
    this.getProducts().then(data => this.products = data);
    this.getProductUnits().then(data => this.productUnits = data);
    this.getProductCategories().then(data => this.productCategories = data);
    this.getUsers().then(data => this.users = data);
    this.getCustomers().then(data => this.customers = data);
    this.getInvoices().then(data => this.invoices = data);
    this.getSales().then(data => this.sales = data);
  };

  /**
     * Get Products
     *
     * @returns {Promise<any>}
     */
    private getProducts(): Promise<Product[]> {
      return this.http.get<Product[]>("https://pos-system-ccbc8.firebaseio.com/products.json").pipe(
          map(res => res.map(item => new Product(item)))
      ).toPromise();
  }

  /**
     * Get Invoices
     *
     * @returns {Promise<any>}
     */
    private getInvoices(): Promise<Invoice[]> {
      return this.http.get<Invoice[]>("https://pos-system-ccbc8.firebaseio.com/invoices.json").pipe(
          map(res => res.map(item => new Invoice(item)))
      ).toPromise();
  }
  /**
     * Get Sales
     *
     * @returns {Promise<any>}
     */
    private getSales(): Promise<Sales[]> {
      return this.http.get<Sales[]>("https://pos-system-ccbc8.firebaseio.com/sales.json").pipe(
          map(res => res.map(item => new Sales(item)))
      ).toPromise();
  }

  /**
     * Get Customers
     *
     * @returns {Promise<any>}
     */
    private getCustomers(): Promise<Customer[]> {
      return this.http.get<Customer[]>("https://pos-system-ccbc8.firebaseio.com/customers.json").pipe(
          map(res => res.map(item => new Customer(item)))
      ).toPromise();
  }

   /**
     * Get Users
     *
     * @returns {Promise<any>}
     */
    private getUsers(): Promise<Users[]> {
      return this.http.get<Users[]>("https://pos-system-ccbc8.firebaseio.com/users.json").pipe(
          map(res => res.map(item => new Users(item)))
      ).toPromise();
  }

  /**
     * Get Product Units
     *
     * @returns {Promise<any>}
     */
    private getProductUnits(): Promise<ProductUnits[]> {
      return this.http.get<ProductUnits[]>("https://pos-system-ccbc8.firebaseio.com/productUnits.json").pipe(
          map(res => res.map(item => new ProductUnits(item)))
      ).toPromise();
  }
  /**
     * Get Product Categories
     *
     * @returns {Promise<any>}
     */
    private getProductCategories(): Promise<ProductCategories[]> {
      return this.http.get<ProductCategories[]>("https://pos-system-ccbc8.firebaseio.com/productCategories.json").pipe(
          map(res => res.map(item => new ProductCategories(item)))
      ).toPromise();
  }

  storeProducts() {
    const products = this.productsService.products;
    this.http
      .put(
        'https://pos-system-ccbc8.firebaseio.com/products.json',
        products
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchProducts() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Product[]>('https://pos-system-ccbc8.firebaseio.com/products.json')
          .pipe(
          map(products => {
            console.log(products);
            return products.map(product => {
              return {
                ...product,
                // ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(products => {
            this.productsService.setProducts(products);
          })
      )
      })
      );

  }
}

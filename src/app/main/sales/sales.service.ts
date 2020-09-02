// import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Sales } from './sales.model';
import { Product } from '../products/products.model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ProductCategories } from 'src/app/shared/shared.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Invoice } from '../invoices/invoices.model';
import { Customer } from '../customers/customers.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  salesChanged = new Subject<Sales[]>();
  startedEditing = new Subject<number>();

  sales: Sales[] = [];

  products: Product[] = [];
  productCategories: ProductCategories[] = [];
  allSales: Sales[] = [];
  invoices: Invoice[] = [];
  customers: Customer[] = [];

  constructor(
    private http: HttpClient
  ) { }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    console.log('RouterStateSnapshot ----> ', state);
    console.log('ActivatedRouteSnapshot ----> ', route);

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllProducts(),
        this.getProductCategories(),
        this.getAllCustomers(),
        this.getAllInvoices(),
        this.getAllSales(),
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

  setProducts(products: Product[]) {
    console.log("setProducts--->", products)
    this.products = [];
    for (let i = 0; i < products.length; i++) {
      this.products.push(new Product(products[i]));
    }
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



   /**
      * Get Customers
      *
      * @returns {Promise<any>}
      */
     getAllCustomers(): Promise<Customer[]> {
      return new Promise((resolve, reject) => {
        this.http.get('https://pos-system-ccbc8.firebaseio.com/customers.json')
          .subscribe((customers: Customer[]) => {

            console.log(customers);
            this.setCustomers(customers);

            resolve(customers);
          }, reject);
      });

    }

    setCustomers(customers: Customer[]) {
      console.log("setCustomers--->", customers)
      this.customers = [];
      for (let i = 0; i < customers.length; i++) {
        this.customers.push(new Customer(customers[i]));
      }
    }

    /**
        * Get Invoices
        *
        * @returns {Promise<any>}
        */
       getAllInvoices(): Promise<Invoice[]> {
        return new Promise((resolve, reject) => {
          this.http.get('https://pos-system-ccbc8.firebaseio.com/invoices.json')
            .subscribe((invoices: Invoice[]) => {

              console.log(invoices);
              this.setInvoices(invoices);

              resolve(invoices);
            }, reject);
        });

      }
      setInvoices(invoices: Invoice[]) {
        console.log("setInvoices--->", invoices)
        this.invoices = [];
        for (let i = 0; i < invoices.length; i++) {
          this.invoices.push(new Invoice(invoices[i]));
        }
      }

      /**
        * Get Sales
        *
        * @returns {Promise<any>}
        */
       getAllSales(): Promise<Sales[]> {
        return new Promise((resolve, reject) => {
          this.http.get('https://pos-system-ccbc8.firebaseio.com/sales.json')
            .subscribe((sales: Sales[]) => {

              console.log(sales);
              this.setAllSales(sales);

              resolve(sales);
            }, reject);
        });

      }
      setAllSales(sales: Sales[]) {
        console.log("setInvoices--->", sales)
        this.allSales = [];
        for (let i = 0; i < sales.length; i++) {
          this.allSales.push(new Sales(sales[i]));
        }
      }

  getSales() {
    /* this.http.get('https://pos-system-ccbc8.firebaseio.com/sales.json').pipe(take(1)).subscribe(
      (sales: Sales[]) => {
        console.log(sales);
        this.setSales(sales);
      }
    ) */

    this.sales = this.groupSales(this.sales);

    return this.sales.slice();
  }

  groupSales(array: Sales[]): Sales[] {

    var result = [];
    array.reduce((res, val) => {
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

    return result;
  }

  setSales(sales: Sales[]) {
    console.log("setSales--->", sales)
    this.sales = [];
    for (let i = 0; i < sales.length; i++) {
      this.sales.push(new Sales(sales[i]));
    }
    this.salesChanged.next(this.sales.slice());
  }

  getSale(productId: number): Sales[] {
    // var sale: Sales = null;
    var tempSales: Sales[] = this.sales;
    return tempSales.filter(el => {
      return el.productId == productId;
    });
  }

  updateSale(productId: number, newSale: Sales) {
    // this.sales[productId] = newSale;
    for (let i = 0; i < this.sales.length; i++) {
      if(this.sales[i].productId == productId){
        this.sales[i] = newSale;
      }
    }
    this.salesChanged.next(this.sales.slice());
  }

  deleteSale(productId: number) {
    // this.sales.splice(index, 1);
    for (let i = 0; i < this.sales.length; i++) {
      if(this.sales[i].productId == productId){
        this.sales.splice(i, 1);
      }
    }
    this.salesChanged.next(this.sales.slice());
  }

  addSales(sale: Sales) {
    this.sales.push(sale);
    this.sales = this.groupSales(this.sales);
    this.salesChanged.next(this.sales.slice());
  }

  addProducts(product: Product) {
    let sale: Sales[] = [{
      salesId: null,
      userId: null,
      invoiceId: null,
      productId: product.productId,
      quantity: 1,
      price: product.price,
      subTotal: product.price,
    },]
    this.sales.push(...sale);
    console.log('sales--->', this.sales);
    this.salesChanged.next(this.sales.slice());
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../config/config';

import { ProductsService } from '../products/products.service';

@Injectable(
  { providedIn: 'root' }
)
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
  ) { }

  storeProducts() {
    const products = this.productsService.getProducts();
    this.http.post(apiURL + 'api/updProduct', products).subscribe(
        response => {
          console.log('DataStorageService:storeProducts-->',response);
        }
    );
  }
}

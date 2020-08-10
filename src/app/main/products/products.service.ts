import { Product } from './products.model';
import { EventEmitter, Injectable } from '@angular/core';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class ProductsService {
  productSelected = new EventEmitter<Product>();

  private products: Product[] = [new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.9,
    stock: 3,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 2,
    product_name: "Second Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 1.4,
    stock: 10,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  }),new Product({
    product_id: 3,
    product_name: "Third Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 36.4,
    stock: 1,
    img_path: "https://www.pt-mkp.com/images/product_icon.png?crc=107442653"
  })];

  constructor(private salesService: SalesService) { }

  getProducts() {
    return this.products.slice();
  }

  addProductsToSales(product: Product) {
    console.log('addProductsToSales', product);
    this.salesService.addProducts(product);
  }
}

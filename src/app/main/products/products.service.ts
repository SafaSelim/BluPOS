import { Product } from './products.model';
import { Injectable } from '@angular/core';
import { SalesService } from '../sales/sales.service';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [new Product({
    product_id: 1,
    product_name: "First Product",
    product_code: "A",
    product_cat_id: 2,
    uom: 3,
    price: 3.9,
    unit_in_stock: 3,
    img_path: "https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
  }), new Product({
    product_id: 2,
    product_name: "Second Product",
    product_code: "B",
    product_cat_id: 2,
    uom: 3,
    price: 1.4,
    unit_in_stock: 10,
    img_path: "https://elcopcbonline.com/photos/product/4/176/4.jpg"
  }), new Product({
    product_id: 3,
    product_name: "Third Product",
    product_code: "C",
    product_cat_id: 2,
    uom: 3,
    price: 36.4,
    unit_in_stock: 1,
    img_path: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MU9M2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1583175284774"
  }), new Product({
    product_id: 4,
    product_name: "Fourth Product",
    product_code: "D",
    product_cat_id: 2,
    uom: 3,
    price: 36.4,
    unit_in_stock: 1,
    img_path: "https://i01.appmifile.com/webfile/globalimg/PC-_14.jpg?width=612&height=612"
  })];

  constructor(private salesService: SalesService) { }

  getProducts() {
    return this.products.slice();
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

export class Product {
  productId: number;
  productName: string;
  productCode: string;
  productCatId: number;
  unitInStock: number;
  uom: number;
  price: number;
  imgPath: string;

  constructor(product) {
    console.log("ProductModel:constructor-->", product);
    this.productId = product.productId;
    this.productName = product.productName || "";
    this.productCode = product.productCode || "";
    this.productCatId = product.productCatId || null;
    this.unitInStock = product.unitInStock || null;
    this.uom = product.uom || null;
    this.price = product.price || null;
    this.imgPath = product.imgPath || "";
  }
}

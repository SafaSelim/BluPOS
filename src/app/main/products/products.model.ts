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
    this.productId = product.prodId;
    this.productName = product.prodName || "";
    this.productCode = product.prodCode || "";
    this.productCatId = product.prodCatId || null;
    this.unitInStock = product.unitInStock || null;
    this.uom = product.uom || null;
    this.price = product.price || null;
    this.imgPath = product.imgPath || "";
  }
}

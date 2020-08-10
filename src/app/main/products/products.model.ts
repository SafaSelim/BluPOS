export class Product {
  productId: number;
  productName: string;
  productCode: string;
  productCatId: number;
  stock: number;
  uom: number;
  price: number;
  imgPath: string;

  constructor(product) {
    console.log("ProductModel:constructor-->", product);
    this.productId = product.product_id;
    this.productName = product.product_name || "";
    this.productCode = product.product_code || "";
    this.productCatId = product.product_cat_id || null;
    this.stock = product.stock || null;
    this.uom = product.uom || null;
    this.price = product.price || null;
    this.imgPath = product.img_path || null;
  }
}

export class Sales{
  salesId: number;
  userId: number;
  invoiceId: number;
  productId: number;
  quantity: number;
  price: number;
  subTotal: number;

  constructor(sale) {
    console.log("SalesModel:constructor-->", sale);
    this.salesId = sale.sales_id;
    this.userId = sale.user_id || "";
    this.invoiceId = sale.invoice_id || "";
    this.productId = sale.product_id || "";
    this.quantity = sale.quantity || "";
    this.price = sale.price || "";
    this.subTotal = sale.sub_total || "";
  }

}

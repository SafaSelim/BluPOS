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
    this.salesId = sale.salesId;
    this.userId = sale.userId || null;
    this.invoiceId = sale.invoiceId || null;
    this.productId = sale.productId || null;
    this.quantity = sale.quantity || null;
    this.price = sale.price || null;
    this.subTotal = sale.subTotal || null;
  }

}

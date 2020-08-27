import { Sales } from '../sales/sales.model';

export class Invoice {
  invoiceId: number;
  customerId: number;
  regUser: number;
  paymentType: number;
  totalAmount: number;
  date: string;
  sales?: Sales[];


  constructor(invoice) {
    console.log("InvoiceModel:constructor-->", invoice);
    this.invoiceId = invoice.invoiceId;
    this.customerId = invoice.customerId || null;
    this.regUser = invoice.regUser || null;
    this.paymentType = invoice.paymentType || null;
    this.totalAmount = invoice.totalAmount || null;
    this.date = invoice.date || "";
    this.sales = invoice.sales || [];
  }
}

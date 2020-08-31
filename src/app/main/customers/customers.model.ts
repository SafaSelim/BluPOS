export class Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  fullName: string;

  constructor(customer) {
    console.log("customerModel:constructor-->", customer);
    this.customerId = customer.customerId;
    this.firstName = customer.firstName || "";
    this.lastName = customer.lastName || "";
    this.contact = customer.contact || "";
    this.address = customer.address || "";
    this.fullName = customer.firstName + " " + customer.lastName || "";
  }
}

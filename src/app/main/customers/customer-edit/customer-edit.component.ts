import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Customer } from '../customers.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  customerForm: FormGroup;

  customers: Customer[] = [];

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.customers = this.customersService.getCustomers();
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      });
  }

  onSubmit() {
    console.log(this.customerForm);
    let custId = 0;
    custId = this.customers.length + 1;
    const newCustomer = new Customer({
      'customerId': custId,
      'firstName' : this.customerForm.value['firstName'],
      'lastName' : this.customerForm.value['lastName'],
      'contact' : this.customerForm.value['contact'],
      'address' : this.customerForm.value['address'],
    });

    console.log("newCustomer",newCustomer);
    if (this.editMode) {
      this.customersService.updCustomer(this.id, newCustomer);
    }else {
      this.customersService.addCustomer(newCustomer);
    }

    this.onCancel();
  }

  private initForm() {
    let firstName = "";
    let lastName = "";
    let contact = "";
    let address = "";
    if (this.editMode) {
      const customer = this.customersService.getCustomer(this.id);
      firstName = customer.firstName;
      lastName = customer.lastName;
      contact = customer.contact;
      address = customer.address;
    }

    this.customerForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'contact': new FormControl(contact, Validators.required),
      'address': new FormControl(address, Validators.required),
    });
  }


  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

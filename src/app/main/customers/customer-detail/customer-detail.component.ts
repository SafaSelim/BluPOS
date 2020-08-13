import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../customers.model';
import { CustomersService } from '../customers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  customerForm: FormGroup;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
    const newCustomer = new Customer(this.customerForm.value);
    console.log("newCustomer",newCustomer);
    if (this.editMode) {
      this.customersService.updCustomer(this.id, newCustomer);
    }else {
      this.customersService.addCustomer(newCustomer);
    }

    this.onCancel();
  }


  private initForm() {
    let customer: Customer = null;
    if (this.editMode) {
      customer = this.customersService.getCustomer(this.id);

    }

    this.customerForm = new FormGroup({
      'firtName': new FormControl(customer.firstName, Validators.required),
      'lastName': new FormControl(customer.lastName, Validators.required),
      'contact': new FormControl(customer.contact, Validators.required),
      'address': new FormControl(customer.address, Validators.required),
    });
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

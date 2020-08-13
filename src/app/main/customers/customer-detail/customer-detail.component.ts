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
  customer: Customer;
  id: number;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.customer = this.customersService.getCustomer(this.id);
      }
    )
  }


  onEditCustomer() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteCustomer() {
    this.customersService.deleteProduct(this.id);
    this.router.navigate(['/customers']);
  }




}

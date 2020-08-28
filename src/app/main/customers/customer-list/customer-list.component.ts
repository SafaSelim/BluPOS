import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers.model';
import { Subscription } from 'rxjs';
import { CustomersService } from '../customers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  subscription: Subscription;

  page = 1;
  pageSize = 10;

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.subscription = this.customersService.customersChanged.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    )
    this.customers = this.customersService.getCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddCustomer() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSearchEnter(value) {
    console.log(value);
  }

  onSearchClose() {

  }

}

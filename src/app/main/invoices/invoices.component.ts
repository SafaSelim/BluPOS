import { Component, OnInit } from '@angular/core';

import { Invoice } from './invoices.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

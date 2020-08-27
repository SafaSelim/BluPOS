import { Component, OnInit, Input } from '@angular/core';

import { Sales } from '../../sales/sales.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Product } from '../../products/products.model';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  @Input()  invoiceId: number;
  @Input() sales?: Sales[];

  products: Product[];

  constructor(
    private dataStorageService: DataStorageService,
  ) {
    this.products = this.dataStorageService.products;
   }

  ngOnInit(): void {
  }

}

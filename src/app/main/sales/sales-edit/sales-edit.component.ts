import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Sales } from '../sales.model';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit {
  @ViewChild('prodIdInput', { static: false }) prodIdInputRef: ElementRef;
  @ViewChild('quantityInput', { static: false }) quantityInputRef: ElementRef;
  @ViewChild('priceInput', { static: false }) priceInputRef: ElementRef;


  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
  }

  onAddItem() {
    const prodId = this.prodIdInputRef.nativeElement.value;
    const prodQty = this.quantityInputRef.nativeElement.value;
    const prodPrice = this.priceInputRef.nativeElement.value;
    const newProduct = new Sales({
      product_id: prodId,
      quantity: prodQty,
      price: prodPrice,
      sub_total: (prodQty*prodPrice),
    });
    this.salesService.addSales(newProduct);

  }

}

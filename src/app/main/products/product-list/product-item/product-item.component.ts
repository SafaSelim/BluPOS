import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../products.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  ngOnInit(): void {
  }

  constructor(
  ) {}

}

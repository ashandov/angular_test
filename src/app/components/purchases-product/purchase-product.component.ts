import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.css'],
})
export class PurchaseProductComponent implements OnInit {
  @Input() product?: Product;

  ngOnInit(): void {}
}

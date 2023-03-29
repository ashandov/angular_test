import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { Purchase } from 'src/app/models/purchase.model';
import { ProductsServices } from 'src/app/services/product.service';
import { PurchaseServices } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-products',
  templateUrl: './purchase-products.component.html',
  styleUrls: ['./purchase-products.component.css'],
})
export class PurchaseProductsComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductsServices,
    private purchaseService: PurchaseServices
  ) {
    this.isLoading = true;
  }

  products: Product[] = [];
  purchases: Purchase[] = [];
  purchasedProducts: Product[] = [];
  isLoading: boolean;

  unsubscribe$ = new Subject<void>();

  @Input() customer?: Customer;

  ngOnInit(): void {
    this.isLoading = true;
    this.productService
      .loadProucts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.products = data;
      });

    this.purchaseService
      .loadPurchases()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.purchases = data;

        let purchase = this.purchases!.filter(
          (pr) => pr.productId == this.customer?.id
        );
        this.purchasedProducts = purchase.map(
          (pu) => this.products!.find((pr) => pr.id == pu.productId)!
        );

        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  productsTrackBy(index: number, product: Product): number {
    return product.id;
  }
}

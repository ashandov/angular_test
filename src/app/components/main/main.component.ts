import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { Purchase } from 'src/app/models/purchase.model';
import { CustomerService } from 'src/app/services/customerService';
import { ProductsServices } from 'src/app/services/productService';
import { PurchaseServices } from 'src/app/services/purchaseService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  title = 'Product Purchases';
  customers: Customer[] = [];
  products: Product[] = [];
  purchases: Purchase[] = [];
  selectedCustomer?: Customer;
  purchasedProducts: Product[] = [];
  isLoading: boolean;

  unsubscribe$ = new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private productService: ProductsServices,
    private purchaseService: PurchaseServices
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.customerService
      .loadCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.customers = data;
      });

    this.productService
      .loadProucts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCustomerSelected(event: Event): void {
    this.isLoading = true;
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = parseInt(selectElement.value);

    this.selectedCustomer = this.customers?.find((x) => x.id == selectedId);

    this.purchaseService
      .loadPurchases()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.purchases = data;
        this.isLoading = false;

        let purchase = this.purchases!.filter((p) => p.productId == selectedId);
        this.purchasedProducts = purchase.map(
          (p) => this.products!.find((pr) => pr.id == p.productId)!
        );
      });
  }

  getCustomerName(id: number): string {
    var c = this.customers?.find((s) => s.id == id);
    return c?.firstName + ' ' + c?.lastName + ' (' + c?.birthYear + ')';
  }

  customerTrackBy(index: number, customer: Customer): number {
    return customer.id;
  }

  productsTrackBy(index: number, product: Product): number {
    return product.id;
  }
}

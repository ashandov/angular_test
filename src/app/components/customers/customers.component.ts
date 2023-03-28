import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  title = 'Product Purchases';
  customers: Customer[] = [];
  selectedCustomer?: Customer;

  unsubscribe$ = new Subject<void>();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
      .loadCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.customers = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCustomerSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    let selectedCustomerId = parseInt(selectElement.value);
    this.selectedCustomer = this.customers.find(
      (c) => c.id == selectedCustomerId
    );
  }

  customerTrackBy(index: number, customer: Customer): number {
    return customer.id;
  }
}

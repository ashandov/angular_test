import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { baseUrl } from 'src/assets/config';
import { Customer } from '../models/customer.model';
import { CustomerResponse } from '../models/customer-response.model ';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  fileName: string = 'customers.json';

  constructor(private http: HttpClient) {}

  loadCustomers(): Observable<Customer[]> {
    const url = `${baseUrl}${this.fileName}`;
    return this.http.get<CustomerResponse[]>(url).pipe(
      map((items) =>
        items.map(
          (item) =>
            ({
              id: item.id,
              firstName: item.firstname,
              lastName: item.lastname,
              birthYear: item.yearofbirth,
              fullName: `${item.firstname} ${item.lastname}`,
            } as Customer)
        )
      )
    );
  }
}

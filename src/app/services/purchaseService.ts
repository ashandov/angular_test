import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PurchaseReponse } from '../models/purchaseResponse.model';
import { baseUrl } from 'src/assets/config';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseServices {
  fileName: string = 'customer-purchases.json';

  constructor(private http: HttpClient) {}

  loadPurchases(): Observable<Purchase[]> {
    const url = `${baseUrl}${this.fileName}`;
    return this.http.get<PurchaseReponse[]>(url).pipe(
      map((items) =>
        items.map(
          (item) =>
            ({
              id: item.id,
              customerId: item.customerid,
              productId: item.productid,
            } as Purchase)
        )
      ),
      delay(1000)
    );
  }
}

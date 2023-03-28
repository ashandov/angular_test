import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/assets/config';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices {
  fileName: string = 'products.json';

  constructor(private http: HttpClient) {}

  loadProucts(): Observable<Product[]> {
    const url = `${baseUrl}${this.fileName}`;
    return this.http
      .get<Product[]>(url)
      .pipe(map((items) => items.map((item) => item)));
  }
}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PurchaseProductComponent } from './components/purchases-product/purchase-product.component';
import { PurchaseProductsComponent } from './components/purchases-products/purchase-products.component';

import { customerInfoPipe } from './pipes/customer-info-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    PurchaseProductsComponent,
    PurchaseProductComponent,
    customerInfoPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

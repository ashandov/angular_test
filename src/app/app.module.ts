import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PurchaseProductsComponent } from './components/purchases-products/purchase-products.component';

import { customerInfoPipe } from './pipes/customer-info-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    PurchaseProductsComponent,
    customerInfoPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

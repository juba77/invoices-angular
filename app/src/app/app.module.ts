import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerApiService } from './services/customer-api.service';
import { InvoiceApiService } from './services/invoice-api.service';
import { CustomerListPageComponent } from './pages/customer-list-page.component';
import { CustomerListComponent } from './components/customer-list.component';
import { CustomerDetailPageComponent } from './pages/customer-detail-page.component';
import { CustomerDetailComponent } from './components/customer-detail.component';
import { InvoiceListComponent } from './components/invoice-list.component';
import { CustomerCreatePageComponent } from './pages/customer-create-page.component';
import { CustomerFormComponent } from './components/customer-form.component';
import { InvoiceCreatePageComponent } from './pages/invoice-create-page.component';
import { InvoiceFormComponent } from './components/invoice-form.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { ErrorPageComponent } from './pages/error-page.component';

const routes: Routes = [
  { path: '', component: CustomerListPageComponent },
  { path: 'create', component: CustomerCreatePageComponent },
  { path: ':id/invoices/add', component: InvoiceCreatePageComponent },
  { path: ':id', component: CustomerDetailPageComponent },
  { path: 'error/message', component: ErrorPageComponent },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({

  declarations: [
    AppComponent,

    CustomerListPageComponent,
    CustomerDetailPageComponent,
    CustomerCreatePageComponent,
    InvoiceCreatePageComponent,
    NotFoundPageComponent,
    ErrorPageComponent,

    CustomerListComponent,
    CustomerDetailComponent,
    CustomerFormComponent,
    InvoiceListComponent,
    InvoiceFormComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],

  providers: [
    CustomerApiService,
    InvoiceApiService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
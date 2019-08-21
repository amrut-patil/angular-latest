import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEntryComponent } from './category/category-entry/category-entry.component';
import { ProductEntryComponent } from './product/product-entry/product-entry.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './user/authentication.intercepter';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryEntryComponent,
    ProductEntryComponent,
    routingComponents,
    CategoryComponent,
    ProductComponent,
    ProductListComponent,
    RegistrationComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule    
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }

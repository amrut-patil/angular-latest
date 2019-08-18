import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
    RegistrationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

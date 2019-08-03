import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatTableModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

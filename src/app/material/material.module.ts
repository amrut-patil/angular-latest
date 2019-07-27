import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatTableModule,
} from '@angular/material';

const MaterialComponents = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

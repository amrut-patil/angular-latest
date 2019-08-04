import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
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
  MatCardModule,
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

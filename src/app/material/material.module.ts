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
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatSortModule
} from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatSortModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent implements OnInit {

  private category: Category;
  public categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    parent: new FormControl('')
  });
  public filteredCategories;
  isLoading = false;

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {
    this.category = new Category();

    let self = this;
    this.filteredCategories = this.categoryForm
      .get('parent')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.categoryService.getCategories({ name: value })
          .pipe(
            finalize(() => self.isLoading = false),
          )
        )
      );
  }

  ngOnInit() {
    this.getSavedCategory();
  }

  newCategory() {
    this.category = new Category();
    this.categoryForm.reset();
  }

  onSave() {
    this.category.name = this.categoryForm.value['name'];
    this.category.parent = this.categoryForm.value['parent']
    this.categoryService.save(this.category).then(((category) => {
      this.category = category;
    })).catch(((error) => {
      console.log(error);
    }));
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure you want to delete this item?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        this.categoryService.delete(this.category._id).then(() => this.newCategory())
      }
    });
    
  }

  private getSavedCategory() {
    this.categoryService.getCategorySource.subscribe(categoryName => {
      this.categoryService.getCategory(categoryName).then((category) => {
        this.category = category;
        this.categoryForm.setValue({
          name: category.name,
          parent: category.parent
        });
      })
    })
  }

}

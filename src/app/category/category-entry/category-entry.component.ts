import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent implements OnInit {

  public categoryForm = new FormGroup({
    name: new FormControl(''),
    parent: new FormControl('')
  });

  public parents: string[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.populateParents();
  }

  onSave() {
    let category: Category = new Category();
    category.name = this.categoryForm.value['name'];
    category.parent = this.categoryForm.value['parent']
    this.categoryService.save(category);

    setTimeout(() => {
      this.populateParents();
    }, 100);

  }

  private populateParents() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.parents = [];
      data.forEach((category: Category) => {
        this.parents.push(category.name);
      })
    })
  }

}

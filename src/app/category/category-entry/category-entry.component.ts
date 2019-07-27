import { Component, OnInit } from '@angular/core';
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
    let self = this;
    setTimeout(() => {
      self.parents = self.categoryService.getCategoryNames();
    }, 0);
  }

  onSave() {
    let category: Category = new Category();
    category.name = this.categoryForm.value['name'];
    category.parent = this.categoryForm.value['parent']
    this.categoryService.save(category);

    this.parents = this.categoryService.getCategoryNames();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  public displayedColumns: string[] = ['name', 'parent', 'path'];
  public dataSource: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.dataSource = this.categoryService.getCategories();
  }

  public refreshCategories() {
    this.table.renderRows();
  }

  ngOnInit() {
    for (let index = 0; index < 5; index++) {
      let category = new Category();
      category.name = "Category " + index;
      this.categoryService.save(category);
    }
  }
}

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

  constructor(private categoryService: CategoryService) { }

  public refreshCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.dataSource = categories;
      this.table.renderRows();
    })
  }

  ngOnInit() {
    this.refreshCategories();
  }

  getRecord(selectedRecord) {
    this.categoryService.getCategoryMessage(selectedRecord.name);
  }

  
}

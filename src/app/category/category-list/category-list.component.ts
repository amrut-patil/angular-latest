import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { MatTable } from '@angular/material';
import { RealTimeService } from 'src/app/shared/real-time.service';
import { ApplicationConstants } from 'src/app/appConstants';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  public displayedColumns: string[] = ['name', 'parent', 'path'];
  public dataSource: Category[] = [];
  private selectedRowIndex: string = '';

  constructor(private categoryService: CategoryService, private realTimeService: RealTimeService) { }

  public refreshCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.dataSource = categories;
      this.table.renderRows();
    })
  }

  ngOnInit() {
    this.refreshCategories();

    this.realTimeService.observeCatgories()
      .subscribe(record => {
        this.updateList(record)
      });
  }

  updateList(record) {
    if (record.operation === ApplicationConstants.INSERT) {
      this.dataSource.push(record.category);
    } else if (record.operation === ApplicationConstants.UPDATE) {
      var foundIndex = this.dataSource.findIndex(x => x._id == record.category._id);
      if (foundIndex > -1)
        this.dataSource[foundIndex] = record.category;
    } else if (record.operation === ApplicationConstants.DELETE) {
      var foundIndex = this.dataSource.findIndex(x => x._id == record.category._id);
      if (foundIndex > -1){
        this.selectedRowIndex = '';
        this.dataSource.splice(foundIndex, 1);
      }
    }
    this.table.renderRows();
  }

  getRecord(selectedRecord) {
    this.selectedRowIndex = selectedRecord._id;
    this.categoryService.getCategoryMessage(selectedRecord.name);
  }

}

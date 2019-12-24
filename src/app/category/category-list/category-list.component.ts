import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { MatTable, MatTableDataSource, MatSort } from '@angular/material';
import { RealTimeService } from 'src/app/shared/real-time.service';
import { ApplicationConstants } from 'src/app/appConstants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['name', 'parent', 'path'];
  public dataSource = new MatTableDataSource([]);
  private selectedRowIndex: string = '';

  constructor(private categoryService: CategoryService, private realTimeService: RealTimeService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.refreshCategories();

    this.realTimeService.observeCatgories()
      .subscribe(record => {
        this.updateList(record)
      });

    this.categoryService.clearRowSelectionSource.subscribe(() => {
      this.selectedRowIndex = "";
    });
  }

  public refreshCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.dataSource.data = categories;
      })
  }

  updateList(record) {
    if (record.operation === ApplicationConstants.INSERT) {
      this.dataSource.data.push(record.category);
      this.selectedRowIndex = record.category._id;
    } else if (record.operation === ApplicationConstants.UPDATE) {
      var foundIndex = this.dataSource.data.findIndex(x => x._id == record.category._id);
      if (foundIndex > -1)
        this.dataSource.data[foundIndex] = record.category;
    } else if (record.operation === ApplicationConstants.DELETE) {
      var foundIndex = this.dataSource.data.findIndex(x => x._id == record.category._id);
      if (foundIndex > -1) {
        this.selectedRowIndex = '';
        this.dataSource.data.splice(foundIndex, 1);
      }
    }
    this.dataSource.data = this.dataSource.data.slice();
  }

  getRecord(selectedRecord) {
    this.selectedRowIndex = selectedRecord._id;
    this.categoryService.getCategoryMessage(selectedRecord.name);
  }

}

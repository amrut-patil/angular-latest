import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatTable, MatSort } from '@angular/material';
import { RealTimeService } from 'src/app/shared/real-time.service';
import { ApplicationConstants } from 'src/app/appConstants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = ['name', 'categories'];
  //public dataSource: Product[] = [];
  public dataSource: any = [];
  private selectedRowIndex: string = '';

  constructor(private productService: ProductService, private realTimeService: RealTimeService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.refreshProducts();

    this.realTimeService.observeProducts()
      .subscribe(record => {
        this.updateList(record)
      });
  }

  updateList(record) {
    if (record.operation === ApplicationConstants.INSERT) {
      this.dataSource.push(record.product);
    } else if (record.operation === ApplicationConstants.UPDATE) {
      var foundIndex = this.dataSource.findIndex(x => x._id == record.product._id);
      if (foundIndex > -1)
        this.dataSource[foundIndex] = record.product;
    } else if (record.operation === ApplicationConstants.DELETE) {
      var foundIndex = this.dataSource.findIndex(x => x._id == record.product._id);
      if (foundIndex > -1) {
        this.selectedRowIndex = '';
        this.dataSource.splice(foundIndex, 1);
      }
    }
    this.table.renderRows();
  }

  public refreshProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.dataSource = products;
      this.table.renderRows();
    })
  }

  getRecord(selectedRecord) {
    this.selectedRowIndex = selectedRecord._id;
    this.productService.getProductMessage(selectedRecord.name);
  }

  doSort() {
    console.log("sorting called");
    this.table.renderRows();
  }
}

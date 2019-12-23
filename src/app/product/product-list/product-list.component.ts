import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { RealTimeService } from 'src/app/shared/real-time.service';
import { ApplicationConstants } from 'src/app/appConstants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['name', 'categories'];
  public dataSource = new MatTableDataSource([]);
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

  public refreshProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.dataSource.data = products;
    })
  }

  updateList(record) {
    if (record.operation === ApplicationConstants.INSERT) {
      this.dataSource.data.push(record.product);
    } else if (record.operation === ApplicationConstants.UPDATE) {
      var foundIndex = this.dataSource.data.findIndex(x => x._id == record.product._id);

      if (foundIndex > -1){
        this.dataSource.data[foundIndex] = record.product;
      }
    } else if (record.operation === ApplicationConstants.DELETE) {
      var foundIndex = this.dataSource.data.findIndex(x => x._id == record.product._id);
      if (foundIndex > -1) {
        this.selectedRowIndex = '';
        this.dataSource.data.splice(foundIndex, 1);
      }
    }
    this.dataSource.data = this.dataSource.data.slice();
  }

  getRecord(selectedRecord) {
    this.selectedRowIndex = selectedRecord._id;
    this.productService.getProductMessage(selectedRecord.name);
  }

}

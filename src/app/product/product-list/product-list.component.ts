import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatTable } from '@angular/material';
import { RealTimeService } from 'src/app/shared/real-time.service';
import { ApplicationConstants } from 'src/app/appConstants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  public displayedColumns: string[] = ['name', 'categories'];
  public dataSource: Product[] = [];

  constructor(private productService: ProductService, private realTimeService: RealTimeService) { }

  ngOnInit() {
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
    this.productService.getProductMessage(selectedRecord.name);
  }

}

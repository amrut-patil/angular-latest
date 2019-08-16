import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  public displayedColumns: string[] = ['name', 'categories'];
  public dataSource: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  public refreshProducts() {
    this.productService.getProducts().subscribe((categories: Product[]) => {
      this.dataSource = categories;
      this.table.renderRows();
    })
  }

  getRecord(selectedRecord) {
    this.productService.getProductMessage(selectedRecord.name);
  }


}

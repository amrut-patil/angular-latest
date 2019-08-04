import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

  public product: Product;
  public productForm = new FormGroup({
    name: new FormControl(''),
    categories: new FormControl('')
  });
  public filteredCategories;
  isLoading = false;

  constructor(private productService: ProductService, private categoryService: CategoryService) { 
    this.product = new Product();

    let self = this;
    this.filteredCategories = this.productForm
      .get('categories')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.categoryService.getCategories({ name: value })
          .pipe(
            finalize(() => self.isLoading = false),
          )
        )
      );
  }

  ngOnInit() {
  }

  newProduct() {
    this.productForm.reset();
    this.product = new Product();
  }

  onSave() {
    this.product.name = this.productForm.value['name'];
    this.product.categories = this.productForm.value['categories']
    this.productService.save(this.product).then(((product) => {
      this.product = product;
    })).catch(((error) => {
      console.log(error);
    }));

    setTimeout(() => {
      //this.populateParents();
    }, 100);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

  public product: Product;
  public productForm = this.formBuilder.group({});
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  attributesDisplayColumns = ['name', 'value'];
  attributesDataSource = new BehaviorSubject<AbstractControl[]>([]);
  attributeRecords: FormArray;

  public filteredCategories;
  isLoading = false;

  constructor(private productService: ProductService, private categoryService: CategoryService, private formBuilder: FormBuilder) {
    this.product = new Product();
  }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      attributes: this.formBuilder.array([])
    });

    this.getSavedProduct();

    this.attributeRecords = <FormArray>this.productForm.controls['attributes'];
    this.attributesDataSource.next(this.attributeRecords.controls);

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

  emptyTable() {
    while (this.attributeRecords.length !== 0) {
      this.attributeRecords.removeAt(0);
    }
  }

  addAttributeRecord() {
    let self = this;

    this.attributeRecords.push(new FormGroup({
      name: new FormControl(''),
      value: new FormControl('')
    }));

    self.updateView();
  }

  updateView() {
    this.attributesDataSource.next(this.attributeRecords.controls);
  }

  newProduct() {
    this.productForm.reset();
    this.product = new Product();
  }

  onSave() {
    this.product.name = this.productForm.value['name'];
    this.product.categories = this.productForm.value['categories'];

    this.product.attributes = [];
    this.productForm.value['attributes'].forEach(attribute => {
      if (attribute.name) {
        this.product.attributes.push({ name: attribute.name, value: attribute.value });
      }
    });

    this.productService.save(this.product).then(((product) => {
      this.product = product;
    })).catch(((error) => {
      console.log(error);
    }));

  }

  addAttribute() {
    this.addAttributeRecord();
  }

  private getSavedProduct() {
    this.productService.getProductSource.subscribe(productName => {

      this.productService.getProduct(productName).then((product) => {
        this.product = product;

        this.updateAttributes(product.attributes)
        this.productForm.setValue({
          name: product.name,
          categories: product.categories,
          attributes: product.attributes
        });

      })
    })
  }

  private updateAttributes(attributes: any) {
    let attributesControl = this.productForm.get('attributes') as FormArray;
    attributesControl.clear();

    attributes.forEach(attribute => {
      this.addAttributeRecord();
    });
    this.updateView();
  }

}

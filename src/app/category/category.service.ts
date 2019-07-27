import { Injectable } from '@angular/core';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];

  constructor() { }

  public save(category: Category) {
    this.populatePath(category);
    this.categories.push(category);
  }

  private populatePath(category: Category) {
    category.path = (this.getParentPath(category.parent) || '') + '/' + category.name;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getCategoryNames(): string[] {
    let categoryNames: string[] = [];
    this.categories.forEach(category => {
      categoryNames.push(category.name);
    });
    return categoryNames;
  }

  public getParentPath(categoryName: string) {
    return this.categories.
      filter((category) => category.name === categoryName).
      map((category) => category ? category.path : '');
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from 'src/app/shared/_services/error-handler.service';
import { Category } from '../core/models/category.model';
import { CategoryService } from '../core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  columnsToDisplay: string[] = ['description', 'update', 'delete'];
  dataSource = new MatTableDataSource<Category>();

  constructor(
    private categoryService: CategoryService,
    private errorService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories = () => {
    this.categoryService.getAll().subscribe(res => {
      this.dataSource.data = res as Category[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  delete(categoryId: number) {
    this.categoryService.delete(categoryId).subscribe(
      () => {
        this.getAllCategories();
      }
    )
  }
}

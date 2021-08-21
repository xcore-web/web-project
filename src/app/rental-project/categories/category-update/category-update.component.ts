import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/categories.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  form: FormGroup;
  category: Category;
  categoryId: number;
  loading = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      categoryId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params["categoryId"];

    this.categoryService.getById(this.categoryId).subscribe((data: Category) => {
      this.category = data;
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.updateCategory();
  }

  private updateCategory() {

    this.categoryService
      .edit(this.categoryId, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(["/rental-project/categories"], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    
    return false;
  }

  public redirectToMediaList() {
    this.router.navigate(['/rental-project/categories'])
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  categories: Category[] = [];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  public validateControl = (controlName: string) => {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched)
      return true;
    
    return false;
  }


  onSubmit(formData) {
    this.categoryService.create(formData.value).subscribe(res => {
      this.router.navigateByUrl('/rental-project/categories');
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    
    return false;
  }

  public redirectToCategoryList() {
    this.router.navigate(['/rental-project/categories'])
  }

}

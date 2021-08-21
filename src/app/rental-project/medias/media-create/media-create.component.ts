import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../core/models/category.model';
import { Media } from '../../core/models/media.model';
import { MediaService } from '../../core/services/medias.service';

@Component({
  selector: 'app-media-create',
  templateUrl: './media-create.component.html',
  styleUrls: ['./media-create.component.scss']
})
export class MediaCreateComponent implements OnInit {

  medias: Media[] = [];
  form: FormGroup;
  category: string;
  categories: Category[];

  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      itemTitle: ['', [Validators.required, Validators.maxLength(100)]],
      categoryId: ['', [Validators.required]],
      itemCategory: ['', [Validators.required]]
    });

    this.getAllCategories();
  }

  public validateControl = (controlName: string) => {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched)
      return true;
    
    return false;
  }

  // Get Foreign Tables
  public getAllCategories = () => {
    this.mediaService.getCategories<Category>().subscribe((category) => {
      this.categories = category
    });
  }


  onSubmit(formData) {
    this.mediaService.create(formData.value).subscribe(res => {
      this.router.navigateByUrl('/rental-project/medias');
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    
    return false;
  }
}

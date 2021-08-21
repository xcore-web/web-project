import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Category } from '../../core/models/category.model';
import { Media } from '../../core/models/media.model';
import { CategoryService } from '../../core/services/categories.service';
import { MediaService } from '../../core/services/medias.service';

export interface CategoryView {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-media-update',
  templateUrl: './media-update.component.html',
  styleUrls: ['./media-update.component.scss']
})
export class MediaUpdateComponent implements OnInit {

  form: FormGroup;
  media: Media;
  mediaId: number;
  category: string;
  categories: Category[];
  loading = false;

  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      itemTitle: ['', [Validators.required, Validators.maxLength(100)]],
      categoryId: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.mediaId = this.route.snapshot.params["mediaId"];

    this.getAllCategories();

    this.mediaService.getById(this.mediaId).subscribe((data: Media) => {
      this.media = data;
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.updateMedia();
  }

  // Get Foreign Tables
  public getAllCategories = () => {
    this.mediaService.getCategories<Category>().subscribe((category) => {
      this.categories = category
    });
  }

  private updateMedia() {

    this.mediaService
      .edit(this.mediaId, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(["/rental-project/medias"], { relativeTo: this.route });
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
    this.router.navigate(['/rental-project/medias'])
  }
}

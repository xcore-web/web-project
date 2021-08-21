import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../core/models/customer.model';
import { Media } from '../../core/models/media.model';
import { Rental } from '../../core/models/rental.model';
import { RentalService } from '../../core/services/rentals.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  rentals: Rental[] = [];
  form: FormGroup;
  medias: Media[];
  customers: Customer[];

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dateOfRental: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      customer: [''],
      mediaId: ['', Validators.required],
      media: ['']
    });

    this.getAllCustomers();
    this.getAllMedias();
  }

  public validateControl = (controlName: string) => {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched)
      return true;
    
    return false;
  }

   // Get Foreign Tables
   public getAllMedias = () => {
    this.rentalService.getMedias<Media>().subscribe((media) => {
      this.medias = media
    });
  }

  public getAllCustomers = () => {
    this.rentalService.getCustomers<Customer>().subscribe((customer) => {
      this.customers = customer
    });
  }


  onSubmit(formData) {
    this.rentalService.create(formData.value).subscribe(res => {
      this.router.navigateByUrl('/rental-project/rentals');
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    
    return false;
  }

}

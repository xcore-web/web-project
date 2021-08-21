import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Customer, CustomerForUpdateDto, SaveCustomer } from '../../core/models/customer.model';
import { CustomerService } from '../../core/services/customers.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  form: FormGroup;
  customer: Customer;
  customerId: number;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(125)]]
    });
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params["customerId"];

    this.customerService.getById(this.customerId).subscribe((data: Customer) => {
      this.customer = data;
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.updateCustomer();
  }

  private updateCustomer() {

    this.customerService
      .edit(this.customerId, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(["/rental-project"], { relativeTo: this.activatedRoute });
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

  public redirectToCustomerList() {
    this.router.navigate(['/rental-project'])
  }
}

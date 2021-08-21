import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Customer, CustomerForCreationDto, SaveCustomer } from '../../core/models/customer.model';
import { CustomerService } from '../../core/services/customers.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  customers: Customer[] = [];
  form: FormGroup;


  customer: SaveCustomer = {
    customerId: 0,
    firstName: '',
    lastName: '',
    address: ''
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(125)]]
    });
  }

  public validateControl = (controlName: string) => {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched)
      return true;
    
    return false;
  }


  onSubmit(formData) {
    this.customerService.create(formData.value).subscribe(res => {
      this.router.navigateByUrl('/rental-project');
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    
    return false;
  }
/*
  public createCustomer = (customerFormValue) => {
    if (this.form.valid) {
      this.executeCustomerCreation(customerFormValue);
    }
  }

  private executeCustomerCreation = (customerFormValue) => {
    const customer: CustomerForCreationDto = {
      firstName: customerFormValue.firstName,
      lastName: customerFormValue.lastName,
      address: customerFormValue.address
    }

    this.customerService.create(customer).subscribe(() => {
      this.router.navigate(['/rental-project'])
    });
  }*/

  public redirectToCustomerList() {
    this.router.navigate(['/rental-project'])
  }
}

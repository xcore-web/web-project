import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordDto } from 'src/app/shared/_interfaces/reset-password/forgot-password-dto.model';
import { AuthenticationService } from 'src/app/shared/_services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;

    const forgotPass = { ...forgotPasswordFormValue };

    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/authentication/resetpassword'
    }

    this._authService.forgotPassword('api/accounts/forgotpassword', forgotPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
    },
    err => {
      this.showError = true;
      this.errorMessage = err;
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter your email';
    }     
    return this.email.hasError('email') ? 'Please enter a valid email' : '';
  }
}

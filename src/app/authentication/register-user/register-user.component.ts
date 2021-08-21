import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserForRegistrationDto } from 'src/app/shared/_interfaces/user/user-for-registration-dto.model';
import { AuthenticationService } from 'src/app/shared/_services/authentication.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/_services/password-confirmation-validator.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public registerForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  hide = true;
  loading = false;

  constructor(private _authService: AuthenticationService,
              private _passConfValidator: PasswordConfirmationValidatorService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });
    
    this.registerForm.get('confirm').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };

    this._authService.registerUser("api/accounts/registration", user)
    .subscribe(_ => {
      console.log("Successful registration");
    },
    error => {
      this.errorMessage = error;
      this.showError = true;
    })
  }
}

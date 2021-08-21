import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';


@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    LoginComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class AuthenticationModule { }

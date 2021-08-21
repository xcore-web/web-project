import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
    {
        path: '', component: AuthenticationLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'resetpassword', component: ResetPasswordComponent },
            { path: 'forgotpassword', component: ForgotPasswordComponent },
            { path: 'emailconfirmation', component: EmailConfirmationComponent },
            { path: 'register', component: RegisterUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
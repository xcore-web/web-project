import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomEncoder } from "../_helpers/custom-encoder";
import { ForgotPasswordDto } from "../_interfaces/reset-password/forgot-password-dto.model";
import { ResetPasswordDto } from "../_interfaces/reset-password/reset-password-dto.model";
import { AuthResponseDto } from "../_interfaces/response/auth-response-dto.model";
import { RegistrationResponseDto } from "../_interfaces/response/registration-response-dto.model";
import { UserForAuthenticationDto } from "../_interfaces/user/user-for-authentication-dto.model";
import { UserForRegistrationDto } from "../_interfaces/user/user-for-registration-dto.model";
import { EnvironmentUrlService } from "./environment-url.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
  // ~~~~~ Get Api Url ~~~~~ //
  baseUrl = environment.apiUrl;

  // ~~~~~ Get User Connection ~~~~~ //
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  
  constructor(
    private _http: HttpClient,
    private _envUrl: EnvironmentUrlService,
    private _jwtHelper: JwtHelperService
    ) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }
/*
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }*/


  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public forgotPassword = (route: string, body: ForgotPasswordDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress), { params: params });
  }
  

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  
  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
  
    return token && !this._jwtHelper.isTokenExpired(token);
  }
  
  public sendEmail = (route: string, email: string, subject: string, body: string) => { 
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('subject', subject);
    params = params.append('body', body);

    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress + '/api/email/send'), { params: params });
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Administrator';
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
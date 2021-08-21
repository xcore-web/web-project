import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this._authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

}

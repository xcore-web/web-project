import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BackEndLayoutComponent } from './back-end-layout/back-end-layout.component';
import { BackEndTabGroupComponent } from './back-end-tab-group/back-end-tab-group.component';
import { BackEndRoutingModule } from './back-end-routing.module';



@NgModule({
  declarations: [
    BackEndLayoutComponent,
    BackEndTabGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BackEndRoutingModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class BackEndModule { }

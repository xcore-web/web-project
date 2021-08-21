import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontEndLayoutComponent } from './front-end-layout/front-end-layout.component';
import { FrontEndRoutingModule } from './front-end-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FrontEndTabGroupComponent } from './front-end-tab-group/front-end-tab-group.component';



@NgModule({
  declarations: [
    FrontEndLayoutComponent,
    FrontEndTabGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FrontEndRoutingModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class FrontEndModule { }

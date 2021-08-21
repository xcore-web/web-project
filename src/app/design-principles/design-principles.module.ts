import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignPrinciplesComponent } from './design-principles.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { DesignPrinciplesRoutingModule } from './design-principles-routing.module';



@NgModule({
  declarations: [
    DesignPrinciplesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    DesignPrinciplesRoutingModule,
  ]
})
export class DesignPrinciplesModule { }

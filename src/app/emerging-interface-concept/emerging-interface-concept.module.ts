import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergingInterfaceConceptRoutingModule } from './emerging-interface-concept-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { EmergingInterfaceConceptComponent } from './emerging-interface-concept.component';



@NgModule({
  declarations: [
    EmergingInterfaceConceptComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    EmergingInterfaceConceptRoutingModule,
  ]
})
export class EmergingInterfaceConceptModule { }

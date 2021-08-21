import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializedOutputDevicesRoutingModule } from './specialized-output-devices-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { SpecializedOutputDevicesComponent } from './specialized-output-devices.component';



@NgModule({
  declarations: [
    SpecializedOutputDevicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    SpecializedOutputDevicesRoutingModule,
  ]
})
export class SpecializedOutputDevicesModule { }

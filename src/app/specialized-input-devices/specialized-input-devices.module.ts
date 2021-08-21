import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { SpecializedInputDevicesRoutingModule } from './specialized-input-devices-routing.module';
import { SpecializedInputDevicesComponent } from './specialized-input-devices.component';



@NgModule({
  declarations: [
    SpecializedInputDevicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    SpecializedInputDevicesRoutingModule,
  ]
})
export class SpecializedInputDevicesModule { }

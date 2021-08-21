import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecializedInputDevicesComponent } from './specialized-input-devices.component';

const routes: Routes = [
    { path: '', component: SpecializedInputDevicesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecializedInputDevicesRoutingModule { }
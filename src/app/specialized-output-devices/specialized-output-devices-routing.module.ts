import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecializedOutputDevicesComponent } from './specialized-output-devices.component';

const routes: Routes = [
    { path: '', component: SpecializedOutputDevicesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecializedOutputDevicesRoutingModule { }
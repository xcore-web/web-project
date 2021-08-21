import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergingInterfaceConceptComponent } from './emerging-interface-concept.component';

const routes: Routes = [
    { path: '', component: EmergingInterfaceConceptComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmergingInterfaceConceptRoutingModule { }

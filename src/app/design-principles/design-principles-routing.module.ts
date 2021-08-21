import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignPrinciplesComponent } from './design-principles.component';

const routes: Routes = [
    { path: '', component: DesignPrinciplesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DesignPrinciplesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontEndLayoutComponent } from './front-end-layout/front-end-layout.component';
import { FrontEndTabGroupComponent } from './front-end-tab-group/front-end-tab-group.component';

const routes: Routes = [
    {
        path: '', component: FrontEndLayoutComponent,
        children: [
            { path: '', component: FrontEndTabGroupComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontEndRoutingModule { }
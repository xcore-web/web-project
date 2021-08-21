import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackEndLayoutComponent } from './back-end-layout/back-end-layout.component';
import { BackEndTabGroupComponent } from './back-end-tab-group/back-end-tab-group.component';

const routes: Routes = [
    {
        path: '', component: BackEndLayoutComponent,
        children: [
            { path: '', component: BackEndTabGroupComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackEndRoutingModule { }
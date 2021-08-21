import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageGalleryComponent } from './image-gallery.component';

const routes: Routes = [
    { path: '', component: ImageGalleryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImageGalleryRoutingModule { }
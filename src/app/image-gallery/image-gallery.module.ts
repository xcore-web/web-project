import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ImageGalleryRoutingModule } from './image-gallery-routing.module';
import { ImageGalleryComponent } from './image-gallery.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';



@NgModule({
  declarations: [
    ImageGalleryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    ImageGalleryRoutingModule,
    GalleryModule,
    LightboxModule
  ],
  exports: [
    ImageGalleryComponent,
    GalleryModule,
    LightboxModule
  ]
})
export class ImageGalleryModule { }

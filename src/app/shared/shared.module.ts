import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerOverlayWrapperComponent } from './components/spinner/spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { SpinnerOverlayComponent } from './components/spinner/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CustomizerComponent } from './layout/customizer/customizer.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentBoxComponent } from './components/comments/comment-box/comment-box.component';

@NgModule({
  declarations: [
    CustomizerComponent,
    SidenavComponent,
    FooterComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    SpinnerOverlayWrapperComponent,
    CommentsComponent,
    CommentBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    CustomizerComponent,
    SidenavComponent,
    FooterComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    SpinnerOverlayWrapperComponent,
    CommentsComponent,
    CommentBoxComponent
  ]
})
export class SharedModule { }

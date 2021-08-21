import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { RentalProjectRoutingModule } from './rental-project-routing.module';
import { RentalProjectLayoutComponent } from './rental-project-layout/rental-project-layout.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customers/customer-update/customer-update.component';
import { MediasComponent } from './medias/medias.component';
import { CategoriesComponent } from './categories/categories.component';
import { MediaCreateComponent } from './medias/media-create/media-create.component';
import { MediaUpdateComponent } from './medias/media-update/media-update.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryUpdateComponent } from './categories/category-update/category-update.component';
import { RentalsComponent } from './rentals/rentals.component';
import { RentalCreateComponent } from './rentals/rental-create/rental-create.component';
import { RentalUpdateComponent } from './rentals/rental-update/rental-update.component';
import { DatabaseStructureComponent } from './database-structure/database-structure.component';
import { EntityFrameworkComponent } from './entity-framework/entity-framework.component';
import { IntroductionComponent } from './introduction/introduction.component';


@NgModule({
  declarations: [
    RentalProjectLayoutComponent,
    CustomersComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    MediasComponent,
    CategoriesComponent,
    MediaCreateComponent,
    MediaUpdateComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    RentalsComponent,
    RentalCreateComponent,
    RentalUpdateComponent,
    DatabaseStructureComponent,
    EntityFrameworkComponent,
    IntroductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    RentalProjectRoutingModule,
  ],
})
export class RentalProjectModule { }

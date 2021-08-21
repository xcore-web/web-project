import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RentalProjectModule } from './rental-project/rental-project.module';
import { CookiesPolicyComponent } from './shared/components/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './shared/components/terms-and-conditions/terms-and-conditions.component';
import { AdminGuard } from './shared/_guards/admin.guard';
import { AuthGuard } from './shared/_guards/auth.guard';

// Athentication Module
const authModule = () => import('./authentication/authentication.module').then(x => x.AuthenticationModule);

// COMP214 -- Interactive Technologies
const designPrinciplesModule = () => import('./design-principles/design-principles.module').then(x => x.DesignPrinciplesModule);
const specializedInputDevicesModule = () => import('./specialized-input-devices/specialized-input-devices.module').then(x => x.SpecializedInputDevicesModule);
const specializedOutputDevicesModule = () => import('./specialized-output-devices/specialized-output-devices.module').then(x => x.SpecializedOutputDevicesModule);
const emergingInterfaceConceptModule = () => import('./emerging-interface-concept/emerging-interface-concept.module').then(x => x.EmergingInterfaceConceptModule);
const imageGalleryModule = () => import('./image-gallery/image-gallery.module').then(x => x.ImageGalleryModule);

// Front-End Module
const frontEndModule = () => import('./front-end/front-end.module').then(x => x.FrontEndModule);

// Back-End Module
const backEndModule = () => import('./back-end/back-end.module').then(x => x.BackEndModule);

// COMP200 -- Introduction To Computer Sciennce
const rentalProjectModule = () => import('./rental-project/rental-project.module').then(x => x.RentalProjectModule);


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'cookies-policy', component: CookiesPolicyComponent },
  { path: 'design-principles', loadChildren: designPrinciplesModule },
  { path: 'specialized-input-devices', loadChildren: specializedInputDevicesModule },
  { path: 'specialized-output-devices', loadChildren: specializedOutputDevicesModule },
  { path: 'emerging-interface-concept', loadChildren: emergingInterfaceConceptModule },
  { path: 'image-gallery', loadChildren: imageGalleryModule },
  {
    path: 'authentication',
    loadChildren: authModule,
    data: { showCustomizer: false, showHeader: false, showSidebar: false, showFooter: false }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'front-end',
    loadChildren: frontEndModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'back-end',
    loadChildren: backEndModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'rental-project',
    loadChildren: rentalProjectModule,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: { showCustomizer: false, showHeader: false, showSidebar: false, showFooter: false }
  },
  {
    path: '500',
    component: ServerErrorComponent,
    data: { showCustomizer: false, showHeader: false, showSidebar: false, showFooter: false }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full', data: { showCustomizer: false, showHeader: false, showSidebar: false, showFooter: false }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

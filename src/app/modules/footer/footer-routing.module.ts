import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterComponent } from '../../components/footer/footer.component';
const routes: Routes = [
  { path: '', component: FooterComponent },
  { path: 'geolocation', loadChildren: () => import('../geolocation/geolocation.module').then(m => m.GeolocationModule) },
];

/**
 * Footer routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionComponent } from '../../components/version/version.component';
const routes: Routes = [
  { path: '', component: VersionComponent },
  { path: 'geolocation', loadChildren: () => import('../geolocation/geolocation.module').then(m => m.GeolocationModule) },
];

/**
 * Version routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionRoutingModule { }

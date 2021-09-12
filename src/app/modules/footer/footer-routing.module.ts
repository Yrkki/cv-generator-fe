// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterComponent } from '../../components/footer/footer.component';
const routes: Routes = [
  { path: '', component: FooterComponent },
  { path: 'geolocation', loadChildren: () => import('../geolocation/geolocation.module').then((m) => m.GeolocationModule) },
  { path: 'pipeline', loadChildren: () => import('../pipeline/pipeline.module').then((m) => m.PipelineModule) },
  { path: 'service-catalog', loadChildren: () => import('../service-catalog/service-catalog.module').then((m) => m.ServiceCatalogModule) },
  { path: 'version', loadChildren: () => import('../version/version.module').then((m) => m.VersionModule) },
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

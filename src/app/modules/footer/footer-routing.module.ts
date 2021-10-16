// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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

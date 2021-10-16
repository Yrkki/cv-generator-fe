// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
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

const routes: Routes = [
  {
    path: 'context-switcher', loadChildren: () => import('./modules/context-switcher/context-switcher.module')
      .then((m) => m.ContextSwitcherModule)
  },
  { path: 'portfolio', loadChildren: () => import('./modules/portfolio/portfolio.module').then((m) => m.PortfolioModule) },
  { path: 'webpage', loadChildren: () => import('./modules/webpage/webpage.module').then((m) => m.WebpageModule) },
  { path: 'corporate', loadChildren: () => import('./modules/corporate/corporate.module').then((m) => m.CorporateModule) },
];

/**
 * App routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

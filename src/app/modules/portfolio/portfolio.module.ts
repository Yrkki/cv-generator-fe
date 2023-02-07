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
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PortfolioRoutingModule } from './portfolio-routing.module';

import { EntitiesModule } from '../entities/entities.module';

import { ModelModule } from '../model/model.module';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

/** Portfolio module. */
@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    FormsModule,

    PortfolioRoutingModule,

    EntitiesModule,

    ModelModule,
  ],
  providers: [
  ],
  exports: []
})
export class PortfolioModule {
  constructor(@Optional() @SkipSelf() public parentModule?: PortfolioModule) {
    if (parentModule) {
      throw new Error(
        'PortfolioModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<PortfolioModule> {
    return {
      ngModule: PortfolioModule,
      providers: [
        PortfolioService,
      ]
    };
  }
}

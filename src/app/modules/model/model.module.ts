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

import { ModelModel } from '../../model/model/model.model';
import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { FilteredModel } from '../../model/filtered/filtered.model';
import { EntitiesModel } from '../../model/entities/entities.model';

import { AccomplishmentsModel } from '../../model/accomplishments/accomplishments.model';
import { ChartModel } from '../../model/chart/chart.model';

/** Model module. */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    ModelModel,
    PortfolioModel,
    FilteredModel,
    EntitiesModel,

    AccomplishmentsModel,
    ChartModel,
  ],
  exports: []
})
export class ModelModule { }

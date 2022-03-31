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
import { NavigationModule } from '../navigation/navigation.module';
import { SearchModule } from '../search/search.module';
import { CvModule } from '../cv/cv.module';
import { ProjectGanttChartMapModule } from '../project-gantt-chart-map/project-gantt-chart-map.module';
import { ProjectSummaryModule } from '../project-summary/project-summary.module';
import { ProjectModule } from '../project/project.module';
import { GeneralTimelineModule } from '../general-timeline/general-timeline.module';
import { PipelineModule } from '../pipeline/pipeline.module';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';
import { ReferenceArchitectureModule } from '../reference-architecture/reference-architecture.module';
import { VersionModule } from '../version/version.module';
import { FooterModule } from '../footer/footer.module';
import { ToggleModule } from '../toggle/toggle.module';
import { TruncatorModule } from '../truncator/truncator.module';
import { ThemeChangerModule } from '../theme-changer/theme-changer.module';
import { SettingsSharerModule } from '../settings-sharer/settings-sharer.module';
import { PropertyModule } from '../property/property.module';
import { HeaderModule } from '../header/header.module';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

/** Portfolio module. */
@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    FormsModule,
    PortfolioRoutingModule,

    NavigationModule,
    SearchModule,
    CvModule,
    ProjectGanttChartMapModule,
    ProjectSummaryModule,
    ProjectModule,
    GeneralTimelineModule,
    PipelineModule,
    ServiceCatalogModule,
    ReferenceArchitectureModule,
    VersionModule,
    FooterModule,

    ToggleModule,
    TruncatorModule,
    ThemeChangerModule,
    SettingsSharerModule,
    PropertyModule,
    HeaderModule,
  ],
  exports: []
})
export class PortfolioModule {
  constructor(@Optional() @SkipSelf() parentModule?: PortfolioModule) {
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

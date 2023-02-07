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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CvModule } from '../cv/cv.module';
import { ProjectGanttChartMapModule } from '../project-gantt-chart-map/project-gantt-chart-map.module';
import { ProjectSummaryModule } from '../project-summary/project-summary.module';
import { ProjectModule } from '../project/project.module';
import { GeneralTimelineModule } from '../general-timeline/general-timeline.module';

import { FooterModule } from '../footer/footer.module';

import { WidgetModule } from '../widget/widget.module';

import { EntitiesService } from '../../services/entities/entities.service';
import { EntitiesAdjusterService } from '../../services/entities-adjuster/entities-adjuster.service';

import { CountCacheService } from '../../services/count-cache/count-cache.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';

/** Entities module. */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    CvModule,
    ProjectGanttChartMapModule,

    ProjectSummaryModule,

    ProjectModule,

    GeneralTimelineModule,

    FooterModule,

    WidgetModule,
  ],
  providers: [
    EntitiesService,
    EntitiesAdjusterService,

    CountCacheService,
    TagCloudProcessorService,
  ],
  exports: [
    CvModule,
    ProjectGanttChartMapModule,

    ProjectSummaryModule,

    ProjectModule,

    GeneralTimelineModule,

    FooterModule,

    WidgetModule,
  ]
})
export class EntitiesModule { }

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

import { ChartService } from '../../services/chart/chart.service';
import { ChartColorService } from '../../services/chart-color/chart-color.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';

/** Chart module. */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    ChartService,
    ChartColorService,
    GanttChartService,
    GeneralTimelineService,
  ],
  exports: []
})
export class ChartModule { }

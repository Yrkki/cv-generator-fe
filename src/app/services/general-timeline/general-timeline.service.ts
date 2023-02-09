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
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { GanttChartService } from '../gantt-chart/gantt-chart.service';
import { ChartColorService } from '../../services/chart-color/chart-color.service';
import { ChartModel } from '../../model/chart/chart.model';
import { UiService } from '../../services/ui/ui.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

/**
 * A general timeline chart diagram service.
 * ~extends {@link GanttChartService}
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralTimelineService extends GanttChartService {
  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param chartColorService The chart color service injected dependency.
   * @param chartModel The chart model injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    protected override readonly chartColorService: ChartColorService,
    public override readonly chartModel: ChartModel,
    public override readonly uiService: UiService,
  ) {
    super(chartColorService, chartModel, uiService);
  }

  /**
   * The X-axis range.
   * ~override
   */
  public override optionsScalesXAxes0Ticks = { min: 25571, max: 25571 + 65 * 365 };

  /**
   * The current context data.
   * ~override
   *
   * @returns A Data object.
   */
  public override get data(): ChartData {
    return {
      datasets: [{
        ...this.backgroundColor(),
        ...this.borderColor('#00000000'),
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        data: this.items.map((_: GeneralTimelineEntry) => _.From)
      }, {
        backgroundColor: this.items.map((_: GeneralTimelineEntry) =>
          this.filteredItems.some((__: GeneralTimelineEntry) => (__.Id === _.Id) && (__.Type === _.Type))
            ? _.Color
            : '#00000020'),
        hoverBackgroundColor: this.items.map((_: GeneralTimelineEntry) => _.Color),
        ...this.borderColor(),
        fill: false,
        borderWidth: 0, // borderWidth: 1,
        pointRadius: 0,
        data: this.items.map((_: GeneralTimelineEntry) => _.To - _.From)
      }],
      labels: this.items.map((_: GeneralTimelineEntry) => _.Type.substring(0, 2) + _.Id + ': ' + _.Name)
    };
  }
}

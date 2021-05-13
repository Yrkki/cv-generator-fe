import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { GanttChartService } from '../gantt-chart/gantt-chart.service';
import { ChartColorService } from '../../services/chart-color/chart-color.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

import { ChartModel } from '../../model/chart/chart.model';

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
   */
  constructor(
    protected readonly chartColorService: ChartColorService,
    public readonly chartModel: ChartModel,
  ) {
    super(chartColorService, chartModel);
  }

  /**
   * The X-axis range.
   * ~override
   */
  public optionsScalesXAxes0Ticks = { min: 28126, max: 43831 + 1 * 365 };

  /**
   * The current context data.
   * ~override
   *
   * @returns A Data object.
   */
  public get data(): ChartData {
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
      labels: this.items.map((_: GeneralTimelineEntry) => _.Type.substr(0, 2) + _.Id + ': ' + _.Name)
    };
  }
}

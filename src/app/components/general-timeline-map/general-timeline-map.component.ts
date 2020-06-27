import { Component, Injector } from '@angular/core';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry';

import { GeneralTimelineComponent } from '../general-timeline/general-timeline.component';

/**
 * General timeline map component.
 * @extends {@link GeneralTimelineComponent}
 */
@Component({
  selector: 'app-general-timeline-map',
  templateUrl: './general-timeline-map.component.html',
  styleUrls: ['./general-timeline-map.component.scss']
})
export class GeneralTimelineMapComponent extends GeneralTimelineComponent {
  /**
   * Constructs a General timeline map component.
   * @constructor
   * @param injector The dependency injector.
   */
  constructor(injector: Injector) {
    super(injector);
    this.key += ' Map';
  }

  /**
   * The current context map data.
   * @override
   *
   * @returns A Map data object.
   */
  public get mapData(): any {
    const data = this.generalTimelineService.data;
    data.datasets[1].borderWidth = 0;
    data.labels = this.generalTimelineService.items.map((_: GeneralTimelineEntry) => '');
    return data;
  }

  /** Draws a general timeline map chart */
  public drawGeneralTimeline(): void {
    const chartType = this.key;
    const data = this.generalTimeline;
    if (data != null) {
      const chartConfiguration = this.generalTimelineService.addChart(data, this.filteredTimelineEvents);
      chartConfiguration.options.scales.xAxes[0].gridLines.drawOnChartArea = false;
      chartConfiguration.options.scales.xAxes[0].ticks.callback = () => '';
      chartConfiguration.options.scales.yAxes[0].ticks = {};
      chartConfiguration.options.tooltips.mode = 'nearest';
      chartConfiguration.data = this.mapData;

      this.portfolioComponent.drawChart(chartType, chartConfiguration);
    }
  }
}

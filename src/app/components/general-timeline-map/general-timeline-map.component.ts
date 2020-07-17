import { Component, Injector, ViewChild, ElementRef } from '@angular/core';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

import { GeneralTimelineComponent } from '../general-timeline/general-timeline.component';

/**
 * General timeline map component.
 * ~extends {@link GeneralTimelineComponent}
 */
@Component({
  selector: 'app-general-timeline-map',
  templateUrl: './general-timeline-map.component.html',
  styleUrls: ['./general-timeline-map.component.scss']
})
export class GeneralTimelineMapComponent extends GeneralTimelineComponent {
  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /**
   * Constructs a General timeline map component.
   * ~constructor
   * @param injector The dependency injector.
   */
  constructor(injector: Injector) {
    // console.log('Debug: GeneralTimelineMapComponent: constructor: constructing...');

    super(injector);
    this.key += ' Map';
  }

  /**
   * The current context map data.
   * ~override
   *
   * @returns A Map data object.
   */
  public get mapData(): any {
    const data = this.generalTimelineService.data;
    if (data.datasets) {
      data.datasets[1].borderWidth = 0;
    }
    data.labels = this.generalTimelineService.items.map((_: GeneralTimelineEntry) => '');
    return data;
  }

  /** Draws a general timeline map chart */
  public drawGeneralTimeline(): void {
    // console.log('Debug: GeneralTimelineMapComponent: drawGeneralTimeline: drawing...');
    const chartType = this.key;
    const data = this.generalTimeline;

    // console.log('Debug: GeneralTimelineMapComponent: drawGeneralTimeline: about to add chart... data: ', data);
    const chartConfiguration = this.generalTimelineService.addChart(data, this.FilteredTimelineEvents);
    chartConfiguration.data = this.mapData;
    if (chartConfiguration.options?.tooltips) {
      chartConfiguration.options.tooltips.mode = 'nearest';
      const axis = chartConfiguration.options?.scales?.yAxes?.[0];
      if (axis) {
        axis.ticks = {};
        axis.ticks.callback = () => '';
        if (axis.gridLines) {
          axis.gridLines.drawOnChartArea = false;
        }
      }
    }

    // console.log(
    //   'Debug: GeneralTimelineMapComponent: drawGeneralTimeline: about to draw chart... chartConfiguration: ',
    //   chartConfiguration
    // );
    this.portfolioComponent.drawChart(chartType, chartConfiguration);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
  }
}

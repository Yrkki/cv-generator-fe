import { Component, Injector, ViewChild, ElementRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

import { GeneralTimelineComponent } from '../general-timeline/general-timeline.component';
import { ChartService } from '../../services/chart/chart.service';

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
   * @param portfolioService The portfolio service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   * @param injector The dependency injector.
   */
  constructor(private injector: Injector) {
    // console.log('Debug: GeneralTimelineMapComponent: constructor: constructing...');

    super(
      injector.get(PortfolioService),
      injector.get(ChartService),
      injector.get(EntitiesService),
      injector.get(InputService),
      injector.get(UiService),
      injector.get(PersistenceService),
      injector.get(DataService),
      injector.get(GeneralTimelineService)
    );

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
      const xAxis = chartConfiguration.options?.scales?.xAxes?.[0];
      if (xAxis) {
        xAxis.display = false;
      }
      const yAxis = chartConfiguration.options?.scales?.yAxes?.[0];
      if (yAxis) {
        yAxis.display = false;
      }
    }

    // console.log(
    //   'Debug: GeneralTimelineMapComponent: drawGeneralTimeline: about to draw chart... chartConfiguration: ',
    //   chartConfiguration
    // );
    this.chartService.drawChart(chartType, chartConfiguration);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

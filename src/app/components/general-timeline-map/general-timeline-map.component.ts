import { AfterViewInit, Component, Injector } from '@angular/core';

import { GeneralTimelineComponent } from '../general-timeline/general-timeline.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { ChartService } from '../../services/chart/chart.service';

import { ChartData } from 'chart.js';

/**
 * General timeline map component.
 * ~extends {@link GeneralTimelineComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-general-timeline-map',
  templateUrl: './general-timeline-map.component.html',
  styleUrls: ['./general-timeline-map.component.scss']
})
export class GeneralTimelineMapComponent extends GeneralTimelineComponent implements AfterViewInit {
  /**
   * Constructs a General timeline map component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   * @param injector The dependency injector.
   */
  constructor(injector: Injector) {
    super(
      injector.get(PortfolioService),
      injector.get(EngineService),
      injector.get(ChartService),
      injector.get(PersistenceService),
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
  private get data(): ChartData {
    const data = this.generalTimelineService.data;
    if (data.datasets) {
      data.datasets[1].borderWidth = 0;
    }
    return data;
  }

  /** Draws a general timeline map chart */
  public drawGeneralTimeline(): void {
    const chartType = this.key;
    const data = this.engine.model.portfolioModel.generalTimeline;
    const chartConfiguration = this.generalTimelineService.addChart(data, this.engine.model.filtered.TimelineEvents);
    chartConfiguration.data = this.data;
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

    this.chartService.drawChart(chartType, chartConfiguration);
  }
}

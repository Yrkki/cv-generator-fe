import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { StringExService } from '../string-ex/string-ex.service';
import { ChartService } from '../chart/chart.service';
import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';
import { ChartColorService } from '../../services/chart-color/chart-color.service';
import { ChartModel } from '../../model/chart/chart.model';

/**
 * A gantt chart diagram service.
 * ~extends {@link ChartService}
 */
@Injectable({
  providedIn: 'root'
})
export class GanttChartService extends ChartService {
  /** All background items shown. */
  items = [];
  /** The current context-relevant items. */
  filteredItems = [];

  /** The X-axis range. */
  public optionsScalesXAxes0Ticks = { min: 34700, max: 43831 + 1 * 365 };

  /**
   * Constructs the Gantt chart service.
   * ~constructor
   *
   * @param chartColorService The chart color service injected dependency.
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    protected readonly chartColorService: ChartColorService,
    protected readonly chartModel: ChartModel,
  ) {
    super(chartColorService, chartModel);
  }

  /**
   * The current context data.
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
        barPercentage: 1.2,
        data: this.items.map((_: any) => _.From)
      }, {
        backgroundColor: this.items.map((_: any) =>
          this.filteredItems.filter((__: GanttChartEntry) => __.Id === _.Id).length > 0 ? _.Color : '#00000020'),
        hoverBackgroundColor: this.items.map((_: any) => _.Color),
        ...this.borderColor(),
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        barPercentage: 1.2,
        data: this.items.map((_: any) => _.To - _.From)
      }],
      labels: this.items.map((_: any) => _['Project name'])
    };
  }

  /**
   * The chart configuration.
   *
   * @returns A ChartConfiguration object.
   */
  protected get chartConfiguration(): ChartConfiguration {
    const chartConfiguration: ChartConfiguration = {
      type: 'horizontalBar',
      options: {
        legend: { display: false },
        tooltips: this.tooltips(),
        scales: this.scales
      },
      data: this.data
    };

    if (chartConfiguration.options?.tooltips?.callbacks) {
      chartConfiguration.options.tooltips.callbacks = {
        title: (_) => '',
        label: (tooltipItem, actualData) => {
          if (tooltipItem.index === undefined) { return ''; }
          return StringExService.splitLine(actualData.labels?.[tooltipItem.index].toString() ?? '');
        },
        // tslint:disable-next-line: variable-name
        labelTextColor: (_tooltipItem, _chart) => '#000000'
      };
    }
    return chartConfiguration;
  }

  /**
   * The scales.
   *
   * @returns A scales object.
   */
  private get scales() {
    return {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          beginAtZero: false,
          stepSize: 365.24 / 4,
          min: this.optionsScalesXAxes0Ticks.min,
          max: this.optionsScalesXAxes0Ticks.max,
          callback: this.ticks,
          fontSize: 12
        },
        gridLines: {},
        stacked: true
      }],
      yAxes: [{
        scaleLabel: { display: true },
        ticks: { beginAtZero: false, min: 0, max: 40, stepSize: 40, mirror: true, lineHeight: 1, fontSize: 12 },
        gridLines: { drawOnChartArea: false },
        stacked: true
      }]
    };
  }

  /**
   * The ticks.
   *
   * @returns A ticks object.
   */
  // tslint:disable-next-line: variable-name
  private ticks(value: number, index: number, _values: any) {
    if (index % 4 === 0) {
      const dateValueFromExcel = (value - (25567 + 1)) * 86400 * 1000;
      const dateFromExcel = new Date(dateValueFromExcel);
      return dateFromExcel.getFullYear();
    } else {
      return '';
    }
  }

  /**
   * Adds a gantt chart.
   * @param items The background items shown.
   * @param filteredItems The current context-relevant items.
   *
   * @returns A ChartConfiguration object.
   */
  public addChart(items: any, filteredItems: any): ChartConfiguration {
    this.items = items;
    this.filteredItems = filteredItems;

    return this.chartConfiguration;
  }
}

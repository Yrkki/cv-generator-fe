import { Injectable } from '@angular/core';
import { StringExService } from '../string-ex/string-ex.service';
import { ChartService } from '../chart/chart.service';
import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';
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
  public optionsScalesXAxes0Ticks = { min: 34700, max: 43831 };

  /**
   * Constructs the Gantt chart service.
   * ~constructor
   *
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    protected chartModel: ChartModel,
  ) {
    super(chartModel);
  }

  /**
   * The current context data.
   *
   * @returns A Data object.
   */
  public get data(): Chart.ChartData {
    return {
      datasets: [{
        backgroundColor: '#00000000',
        hoverBackgroundColor: '#00000000',
        borderColor: '#00000000',
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        barPercentage: 1.2,
        data: this.items.map((_: any) => _.From)
      }, {
        backgroundColor: this.items.map((_: any) =>
          this.filteredItems.filter((__: GanttChartEntry) => __.Id === _.Id).length > 0
            ? _.Color
            : '#00000020'),
        hoverBackgroundColor: this.items.map((_: any) => _.Color),
        borderColor: '#E8E8E8',
        hoverBorderColor: '#E8E8E8',
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
  public get chartConfiguration(): Chart.ChartConfiguration {
    return {
      type: 'horizontalBar',
      options: {
        legend: {
          display: false
        },
        tooltips: {
          mode: 'nearest',
          position: 'average',
          xPadding: 6,
          yPadding: 6,
          bodyFontSize: 14,
          bodySpacing: 2,
          caretSize: 10,
          displayColors: false,
          backgroundColor: 'rgba(255,255,255,0.7)',
          bodyFontColor: '#fff',
          callbacks: {
            title: _ => '',
            label: (tooltipItem, actualData) => {
              if (!tooltipItem.index) { return ''; }
              return StringExService.splitLine(actualData.labels?.[tooltipItem.index].toString() ?? '');
            },
            labelTextColor: (tooltipItem, chart) => '#000000'
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtZero: false,
              stepSize: 365.24 / 4,
              min: this.optionsScalesXAxes0Ticks.min,
              max: this.optionsScalesXAxes0Ticks.max,
              callback: (value, index, values) => {
                if (index % 4 === 0) {
                  const dateValueFromExcel = (value as number - (25567 + 1)) * 86400 * 1000;
                  const dateFromExcel = new Date(dateValueFromExcel);
                  return dateFromExcel.getFullYear();
                } else {
                  return '';
                }
              },
              fontSize: 14
            },
            gridLines: {
            },
            stacked: true
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 40,
              stepSize: 40,
              mirror: true,
              fontSize: 14
            },
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true
          }]
        }
      },
      data: this.data
    };
  }

  /**
   * Adds a gantt chart.
   * @param items The background items shown.
   * @param filteredItems The current context-relevant items.
   *
   * @returns A ChartConfiguration object.
   */
  addChart(items: any, filteredItems: any): Chart.ChartConfiguration {
    this.items = items;
    this.filteredItems = filteredItems;

    return this.chartConfiguration;
  }
}

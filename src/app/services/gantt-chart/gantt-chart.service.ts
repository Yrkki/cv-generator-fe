// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { ChartConfiguration, ChartData, ChartType, ChartTypeRegistry, ScaleOptionsByType, Tick } from 'chart.js';
import { DeepPartial } from 'chart.js/types/utils';

import { Indexable } from '../../interfaces/indexable';

import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';

import { StringExService } from '../string-ex/string-ex.service';
import { ChartService } from '../chart/chart.service';
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
  protected items = [];
  /** The current context-relevant items. */
  protected filteredItems = [];

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
    public readonly chartModel: ChartModel,
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
  protected get chartConfiguration(): DeepPartial<ChartConfiguration> {
    const ttype: ChartType = 'bar';
    const chartConfiguration: ChartConfiguration = {
      type: ttype,
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: this.tooltip<typeof ttype>() as any,
        }, scales: this.scales,
      }, data: this.data,
    };
    // tslint:disable-next-line: no-non-null-assertion
    chartConfiguration.options!.plugins!.tooltip!.callbacks!.title = (_) => '';
    // tslint:disable-next-line: no-non-null-assertion
    chartConfiguration.options!.plugins!.tooltip!.callbacks!.label = (tooltipItem) => StringExService.splitLine(tooltipItem.label);
    return chartConfiguration;
  }

  /**
   * The scales.
   *
   * @returns A scales object.
   */
  private get scales(): DeepPartial<Indexable<ScaleOptionsByType<ChartTypeRegistry['bar']['scales']>>> {
    return {
      x: {
        type: 'linear',
        position: 'bottom',
        beginAtZero: false, min: this.optionsScalesXAxes0Ticks.min, max: this.optionsScalesXAxes0Ticks.max,
        ticks: { stepSize: 365.24 / 4, callback: this.ticks, font: { size: 12 } },
        grid: {},
        stacked: true
      },
      y: {
        title: { display: true },
        ticks: { mirror: true, font: { lineHeight: 1, size: 12 } },
        grid: { display: false },
        stacked: true
      }
    };
  }

  /**
   * The ticks.
   *
   * @returns A ticks object.
   */
  // tslint:disable-next-line: variable-name
  private ticks(tickValue: number | string, index: number, _ticks: Tick[]) {
    if (index % 4 === 0) {
      const dateValueFromExcel = (tickValue as number - (25567 + 1)) * 86400 * 1000;
      const dateFromExcel = new Date(dateValueFromExcel);
      return dateFromExcel.getFullYear();
    } else {
      return '';
    }
  }

  /**
   * Adds a gantt chart.
   *
   * @param items The background items shown.
   * @param filteredItems The current context-relevant items.
   *
   * @returns A ChartConfiguration object.
   */
  public addChart(items: any, filteredItems: any): DeepPartial<ChartConfiguration> {
    this.items = items;
    this.filteredItems = filteredItems;

    return this.chartConfiguration;
  }
}

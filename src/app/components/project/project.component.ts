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
import {
  Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, Inject
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { DataService } from '../../services/data/data.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';

import { MockDataService } from '../../services/mock-data/mock-data.service';

import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';
import { ChartService } from '../../services/chart/chart.service';
import { HeaderTitleComponent } from '../header-title/header-title.component';
import { HeaderComponent } from '../header/header.component';

/**
 * Project component
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Projects header title element. */
  @ViewChild('projectsHeaderTitle') projectsHeaderTitle?: HeaderTitleComponent;

  /** SorterKind enum accessor. */
  public get SorterKind() { return SorterKind; }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** The projects */
  public get projects() {
    this.portfolioService.currentProjectPeriod = undefined;
    return this.truncatorService.truncated(
      this.sorterService.sorted(
        this.portfolioService.model.filtered.Projects));
  }

  /** The gantt chart data */
  private ganttChart = new Array<GanttChartEntry>();

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /**
   * Constructs the Project component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param ganttChartService The gantt chart service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    public readonly entitiesService: EntitiesService,
    public readonly chartService: ChartService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public dataService: DataService,
    public readonly ganttChartService: GanttChartService,
  ) {
  }

  /** Subscription */
  ngOnInit() { this.searchTokenSubscription = this.portfolioService.subscribe('ST', (p: string) => this.onSearchTokenChanged(p)); }
  /** Cleanup */
  ngOnDestroy() { this.searchTokenSubscription?.unsubscribe(); }

  /**
   * Load data
   */
  ngAfterViewInit() {
    this.LoadData();
  }

  /**
   * Load data
   *
   * @param mockDataService The mock data service for testing.
   */
  LoadData(mockDataService?: MockDataService) {
    if (mockDataService) { this.dataService = mockDataService; }

    ['Project Portfolio'].forEach((_) => this.persistenceService.restoreToggle(document, _));
    ['Gantt Chart', 'Gantt Chart Map', 'Contributions', 'List', 'Index', 'Projects']
      .forEach((_) => this.persistenceService.restoreToggle(document, _));

    this.getGanttChart();
  }

  /** Search token changed event handler. */
  // tslint:disable-next-line: variable-name
  private onSearchTokenChanged(_value: string) {
    this.drawProjectGanttChart();
  }

  /** Draws the gantt chart. */
  private drawProjectGanttChart() {
    const chartType = 'Project Gantt';
    const data = this.ganttChart;

    const chartConfiguration = this.ganttChartService.addChart(data, this.portfolioService.model.filtered.Projects);

    this.chartService.drawChart(chartType, chartConfiguration);
    this.chartService.drawChart(chartType + ' Map', chartConfiguration);
  }

  /** Loads the gantt chart. */
  private getGanttChart(): void {
    this.dataService.getGanttChart().pipe(take(1)).subscribe((ganttChart) => {
      this.ganttChart = ganttChart;
      this.drawProjectGanttChart();
    });
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

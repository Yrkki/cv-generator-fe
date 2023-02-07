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
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { ChartService } from '../../services/chart/chart.service';

import { HeaderComponent } from '../header/header.component';

/**
 * General timeline component.
 * ~implements {@link OnInit}
 * ~implements {@link AfterViewInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  selector: 'app-general-timeline',
  templateUrl: './general-timeline.component.html',
  styleUrls: ['./general-timeline.component.scss']
})
export class GeneralTimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.entities; }

  /** The component key */
  public key = 'General Timeline';

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /**
   * Constructs a General timeline component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    protected readonly chartService: ChartService,
    protected readonly persistenceService: PersistenceService,
    protected readonly generalTimelineService: GeneralTimelineService
  ) {
  }

  /** Subscription */
  ngOnInit() { this.searchTokenSubscription = this.portfolioService.subscribe('ST', (g: string) => this.onSearchTokenChanged(g)); }
  /** Cleanup */
  ngOnDestroy() { this.searchTokenSubscription?.unsubscribe(); }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => {
      this.persistenceService.restoreToggle(document, this.key);
      this.drawGeneralTimeline();
    });
  }

  /** Search token changed event handler. */
  // tslint:disable-next-line: variable-name
  private onSearchTokenChanged(_value: string) {
    this.engine.model.filtered.TimelineEvents = this.engine.filterGeneralTimelineService.calcFilteredTimelineEvents();
    this.drawGeneralTimeline();
  }

  /** Draws a general timeline chart */
  public drawGeneralTimeline(): void {
    const chartType = this.key;
    const data = this.engine.model.generalTimeline;
    const chartConfiguration = this.generalTimelineService.addChart(data, this.engine.model.filtered.TimelineEvents);
    // tslint:disable-next-line: no-non-null-assertion
    const scales = chartConfiguration.options!.scales!;
    // tslint:disable-next-line: no-non-null-assertion
    scales.x!.ticks!.font = { size: 8 };
    // tslint:disable-next-line: no-non-null-assertion
    scales.y!.ticks!.font = { size: 8, lineHeight: 0.5 };

    this.chartService.drawChart(chartType, chartConfiguration);
  }

  /**
   *  Whether the general timeline is defined.
   *
   * @returns Whether the general timeline is defined.
   */
  public generalTimelineDefined(): boolean {
    return this.portfolioService.jsonDefined(this.engine.model.generalTimeline);
  }
}

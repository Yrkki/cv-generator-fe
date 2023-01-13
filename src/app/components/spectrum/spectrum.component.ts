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
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { SpectrumProviderComponent } from '../spectrum-provider/spectrum-provider.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { ChartService } from '../../services/chart/chart.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';

/**
 * Spectrum component.
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent extends SpectrumProviderComponent implements OnInit, OnDestroy, AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') public canvas?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') public clickable?: ElementRef;

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** Responsive modelChanged subscription. */
  private responsiveModelChanged: Subscription | undefined;

  /**
   * Constructs a Spectrum component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Spectrum)) public override readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Ps)) public override readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly persistenceService: PersistenceService,
    public readonly chartService: ChartService) {
    super(portfolioService, sorterService, truncatorService, uiService, persistenceService);
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.portfolioService.subscribe('ST', (_: string) => this.onSearchTokenChanged(_));
    this.responsiveModelChanged = this.portfolioService.subscribe('RM', (_: ResponsiveChangedEvent) => this.onResponsiveToggled(_));
  }
  /** Cleanup */
  ngOnDestroy() {
    this.responsiveModelChanged?.unsubscribe();
    this.searchTokenSubscription?.unsubscribe();
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.persistenceService.restoreToggle(document, this.key);
    if (this.key === 'Country') {
      this.persistenceService.restoreToggle(document, this.key + ' Index');
      this.persistenceService.restoreToggle(document, this.key + ' Map');
    }
    this.drawFrequenciesChart('ngAfterViewInit');
  }

  /** Search token changed event handler. */
  // tslint:disable-next-line: variable-name
  private onSearchTokenChanged(_value: string) {
    this.drawFrequenciesChart('onSearchTokenChanged');
  }

  /** Responsive toggled event handler. */
  private onResponsiveToggled(event: ResponsiveChangedEvent) {
    if (event.sourceEntityKey !== 'Project Summary') { return; }

    this.drawFrequenciesChart('onResponsiveToggled');
  }

  /**
   * Draws a frequencies chart.
   *
   * @param _caller The caller function identification.
   */
  // tslint:disable-next-line: variable-name
  private async drawFrequenciesChart(_caller: any) {
    // console.log('Debug: In drawFrequenciesChart:', caller);

    const data = this.portfolioService.getFrequenciesCache(this.key);

    this.chartService.refreshCharts();
    this.chartService.drawChart(this.key,
      this.chartService.addChart(data, this.portfolioService.toolbarService.responsive('Project Summary')));
  }
}

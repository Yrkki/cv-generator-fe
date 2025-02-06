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
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PropertyComponent } from '../property/property.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { ChartService } from '../../services/chart/chart.service';

import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';

/**
 * Language component.
 * ~extends {@link PropertyComponent}
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends PropertyComponent implements OnInit, OnDestroy, AfterViewInit {
  /** The component key */
  public key = 'Language';

  /** Responsive modelChanged subscription. */
  private responsiveModelChanged: Subscription | undefined;

  /**
   * Constructs a Language component.
   * ~constructor
   *
   * @param chartService The chart service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private readonly chartService: ChartService,
    public override readonly portfolioService: PortfolioService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService);
  }

  /** Subscription */
  ngOnInit() {
    this.responsiveModelChanged = this.portfolioService.subscribe('RM', (_: ResponsiveChangedEvent) => this.onResponsiveToggled(_));
  }
  /** Cleanup */
  ngOnDestroy() { this.responsiveModelChanged?.unsubscribe(); }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.drawLanguageChart();
  }

  /** Draws a language chart */
  private drawLanguageChart() {
    if (typeof this.portfolioService.model.cv !== 'undefined' && this.portfolioService.model.cv != null) {
      const chartType = 'Language';
      const data = this.portfolioService.model.cv.Languages;

      this.chartService.chartModel.chartLoaded[chartType] = false;
      this.chartService.drawChart(chartType,
        this.chartService.addLanguageChart(data, this.portfolioService.toolbarService.responsive('Languages Chart')));
    }
  }

  /** Responsive toggled event handler. */
  private onResponsiveToggled(event: ResponsiveChangedEvent) {
    if (event.sourceEntityKey !== 'Languages Chart') { return; }

    this.drawLanguageChart();
  }
}

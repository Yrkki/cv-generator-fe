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
// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { MapService } from '../../services/map/map.service';
import { EngineService } from '../../services/engine/engine.service';

import type { Layout, PlotData } from 'plotly.js';
import { logger } from '../../services/logger/logger.service';

/** The Plotly object type */
type PlotlyInstance = typeof import('plotly.js') & Record<string, unknown>;

/**
 * Map component
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Entity key. */
  @Input() key: any;

  /** The map element. */
  @ViewChild('map') map?: ElementRef;

  /** The map html element. */
  mapHTMLElement?: HTMLDivElement;

  /** The Plotly object */
  private plotly!: PlotlyInstance;

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  // tslint:disable-next-line: variable-name
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(_event: Event) { this.resize(); }

  /**
   * Constructs the Map component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param mapService The map service injected dependency.
   * @param engine The engine service injected dependency.
   */
  constructor(
    protected readonly portfolioService: PortfolioService,
    protected readonly mapService: MapService,
    protected readonly engine: EngineService,
  ) {
  }

  /** Subscription */
  ngOnInit() { this.searchTokenSubscription = this.portfolioService.subscribe('ST', (m: string) => this.onSearchTokenChanged(m)); }
  /** Cleanup */
  ngOnDestroy() { this.searchTokenSubscription?.unsubscribe(); }

  /** Initialization */
  ngAfterViewInit() {
    this.initPlotly();
  }

  /** Initialize Plotly and draw the map */
  private async initPlotly() {
    const plotly = await this.ensurePlotly();
    if (!plotly) {
      this.warn('[Plotly] Failed to load Plotly.');
      return;
    }

    await this.drawMap();
  }

  /** Ensure Plotly is loaded */
  private async ensurePlotly() {
    if (this.plotly) {
      return this.plotly;
    }

    if (!this.hasDocument()) {
      return null;
    }

    try {
      const plotlyModule = await import('plotly.js/dist/plotly-geo.min.js');
      const plotly = plotlyModule.default;
      this.plotly = plotly;
      return plotly;
    } catch (error) {
      this.warn('[Plotly] Failed to load Plotly:', error);
      return null;
    }
  }

  /** The document checker */
  protected hasDocument(): boolean { return typeof document !== 'undefined'; }

  /** Search token changed event handler. */
  // tslint:disable-next-line: variable-name
  private onSearchTokenChanged(_value: string) {
    this.drawMap();
  }

  /** The resize event handler */
  private resize() {
    if (this.mapHTMLElement) {
      this.plotly?.Plots.resize(this.mapHTMLElement);
    }
  }

  /**
   * Draws a map.
   *
   * @param entity The entity. Optional.
   * @param frequencies The frequencies. Optional.
   * @param countriesVisited The countries visited. Optional.
   */
  public async drawMap() {
    // get map container
    const mapContainer = this.map?.nativeElement;
    if (!mapContainer) { return; }

    // ensure entity
    const entity = this.mapService.entity;
    if (!entity) { return; }

    // ensure frequencies
    const frequencies = this.portfolioService.getFrequenciesCache(entity.key);
    const frequenciesClone = frequencies.slice(0);

    // ensure countriesVisited
    const countriesVisited = this.mapService.countriesVisited;
    if (!countriesVisited) { return; }

    // plot map
    const { data, layout } = this.mapService.prepareMap(frequenciesClone, countriesVisited);
    await this.purgeOldMap();
    await this.plot(mapContainer, data as unknown as Partial<PlotData>[], layout as unknown as Partial<Layout>);
  }

  /** Plot. */
  private async plot(mapContainer: HTMLElement, data: Partial<PlotData>[], layout: Partial<Layout>) {
    // Cast or type-guard the dynamic Plotly methods explicitly to satisfy no-unsafe-call
    const plotlyObj = this.plotly as PlotlyInstance & {
      newPlot?: (container: HTMLElement, data: Partial<PlotData>[], layout: Partial<Layout>, config?: Record<string, unknown>)
        => Promise<unknown>;
      react: (container: HTMLElement, data: Partial<PlotData>[], layout: Partial<Layout>, config?: Record<string, unknown>)
        => Promise<unknown>;
    };

    const drawPlot = plotlyObj.newPlot ?? plotlyObj.react;
    await drawPlot(mapContainer, data, layout, { showLink: false });
  }

  /** Purge old map. */
  private async purgeOldMap() {
    // get map container
    const mapContainer = this.map?.nativeElement;
    if (!mapContainer) { return; }

    mapContainer.innerHTML = '';

    // crate new map dom node
    const map = document.createElement('div');
    map.style.cssText = 'width: 100%; height: 250px';
    this.mapHTMLElement = mapContainer.appendChild(map);
    // logger.log('Debug: Map width: ', this.mapHTMLElement.clientWidth);
  }

  /** Warn logger */
  private warn(...data: any[]): void {
    logger.warn(data);
  }
}

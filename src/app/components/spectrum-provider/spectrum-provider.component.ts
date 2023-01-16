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
import { Component, Input } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

/**
 * SpectrumProvider component.
 */
@Component({
  selector: 'app-spectrum-provider',
  templateUrl: './spectrum-provider.component.html',
  styleUrls: ['./spectrum-provider.component.scss']
})
export class SpectrumProviderComponent {
  /** Entity key. */
  @Input() public key: any;

  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /**
   * Constructs a SpectrumProvider component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly sorterService: SorterService,
    public readonly truncatorService: TruncatorService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /** Get frequencies cache delegate. */
  public getFrequenciesCache(frequenciesCacheKey: string): any[] {
    // if (this.portfolioService.checkToggleCollapsed(frequenciesCacheKey)) { return []; }

    return this.portfolioService.getFrequenciesCache(frequenciesCacheKey);
  }

  /** Chart height. */
  public get chartHeight(): number {
    let height = 350;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        height = 650 + frequencies.length * 6;
      }
    }

    return height;
  }

  /** Chart width. */
  public get chartWidth(): number {
    let width = 2300;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        width = this.chartHeight + Math.ceil(frequencies.length / (this.chartHeight / 25)) * 100;
      }
    }

    return width;
  }

  /** Whether a simple chart should be used. */
  public get simpleChart(): boolean {
    return this.portfolioService.toolbarService.tagCloud === TagCloudDisplayMode.both;
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Truncated collection delegate. */
  public get truncated(): any[] {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.truncated(this.sorterService.sorted(collection));
  }

  /** Remaining collection length. */
  public get remainingLength(): number {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.remainingLength(collection);
  }
}

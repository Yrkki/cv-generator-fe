import { Component, Inject, Input } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

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

  /** PS focus threshold getter. */
  public get PsFocusThreshold() {
    const key = `${TruncatorKind[TruncatorKind.Ps]}${TruncatorService.focusThresholdPropertyName}`;
    return Number.parseInt(
      this.persistenceService.getItem(key)
      ?? TruncatorService.focusThresholdDefaults.get(TruncatorKind.Ps)?.toString()
      ?? '30', 10
    );
  }
  /** PS focus threshold setter. */
  public set PsFocusThreshold(value) {
    const key = `${TruncatorKind[TruncatorKind.Ps]}${TruncatorService.focusThresholdPropertyName}`;
    this.persistenceService.setItem(key, value.toString());
  }

  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /**
   * Constructs a SpectrumProvider component.
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
    public readonly portfolioService: PortfolioService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Spectrum)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Ps)) public readonly truncatorService: TruncatorService,
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

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Truncated collection delegate. */
  public get truncated(): any[] {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.truncated(this.sorterService.sorted(collection)) ?? [];
  }

  /** Remaining collection length. */
  public get remainingLength(): number {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.remainingLength(collection);
  }
}

import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';

import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { Params } from '../../services/component-outlet-injector/params';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

/**
 * Publication index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-publication-index',
  templateUrl: './publication-index.component.html',
  styleUrls: ['./publication-index.component.scss']
})
export class PublicationIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** The key. */
  public get key() { return 'Title'; }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(event: MouseEvent) { this.engine.searchService.updateSearchToken(event); }

  /**
   * Constructs the Publication component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Publications)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }

  /** Match frequency for the template to the precalculated cache. */
  public get frequency() {
    let frequency;

    try {
      const frequenciesCacheKey = this.key;
      frequency = this.getFrequenciesCache(frequenciesCacheKey).find((_) => _[0] === this.propertyName[this.key]);
    } catch (ex) {
      frequency = this.engine.filterService.getEmptyFrequency(this.propertyName[this.key]);
    }

    return frequency;
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioService.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

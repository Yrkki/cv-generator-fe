import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { Go } from '../../enums/go.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * Sorter component
 */
@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent {
  /** The sorter component target type. */
  @Input() type = '';

  /** The sorter component display type. */
  public get displayType() { return this.portfolioService.model.portfolioModel.entities[this.type]?.section || this.type; }

  /** The sorter component target sorter kind. */
  #sorterKind!: SorterKind;
  /** Sorter kind getter. */
  public get sorterKind() {
    return this.#sorterKind;
  }
  /** Sorter kind setter. */
  @Input() public set sorterKind(value) {
    if (this.#sorterKind !== value) {
      this.#sorterKind = value;

      // initialize the sorterService
      this.Initialize();
    }
  }

  /** The proper sorter service to use. */
  private sorterService!: SorterService;

  /** Sort field subcomponent. */
  // eslint-disable-next-line max-lines-per-function
  public get subSortField() {
    return {
      /** The proper sorter service to use. */
      sorterService: this.sorterService,
      /** Sort field subservice delegate. */
      get subSortField() { return this.sorterService?.subSortField; },

      /** Sort field index getter delegate. */
      get sortFieldIndex() { return this.sorterService?.sortFieldIndex ?? 0; },
      /** Sort field index setter delegate. */
      set sortFieldIndex(value) { if (this.sorterService && value) { this.sorterService.sortFieldIndex = value; } },

      /** Sort order getter delegate. */
      get sortOrder() { return this.sorterService?.sortOrder ?? 0; },
      /** Sort order setter delegate. */
      set sortOrder(value) { if (this.sorterService && value) { this.sorterService.sortOrder = value; } },

      /** Sort field index order direction getter. */
      get orderDirection() { return this.subSortField.orderDirection[this.sortOrder]; },
      /** Next home getter. */
      get nextHome() { return this.subSortField.indexNextDirection[Go.Home]; },
      /** Next back getter. */
      get nextBack() { return this.subSortField.indexNextDirection[Go.Back]; },
      /** Next forward getter. */
      get nextForward() { return this.subSortField.indexNextDirection[Go.Forward]; },
      /** Is in natural order predicate getter delegate. */
      get isInNaturalOrder() { return this.sorterService.isInNaturalOrder; },

      /** Sort field getter delegate. */
      sortField(value: number) { return this.sorterService?.sortField(value); },
      /** Next sort delegate. */
      nextSort(event: MouseEvent, go = Go.Forward) { this.sorterService.nextSort(event, go); },
      /** Next sort title delegate. */
      nextSortTitle(go = Go.Forward) { return this.sorterService?.nextSortTitle(go) ?? ''; },
      /** Sorted collection delegate. */
      sorted(collection: any[]): any[] { return this.sorterService.sorted(collection) ?? []; },
    };
  }

  /** A clickable back element. */
  @ViewChild('clickableBack') clickableBack!: ElementRef<HTMLSpanElement>;
  /** A clickable forward element. */
  @ViewChild('clickableForward') clickableForward!: ElementRef<HTMLSpanElement>;
  /** A clickable home element. */
  @ViewChild('clickableHome') clickableHome!: ElementRef<HTMLSpanElement>;

  /** Go enum accessor. */
  public get Go() { return Go; }

  /**
   * Constructs the sorter component.
   * ~constructor
   *
   * @param sorterServiceAccomplishment The accomplishment sorter service injected dependency.
   * @param sorterServicePublication The publication sorter service injected dependency.
   * @param sorterServiceSpectrum The spectrum sorter service injected dependency.
   * @param sorterServiceProjects The projects sorter service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Accomplishments)) private readonly sorterServiceAccomplishment: SorterService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Publications)) private readonly sorterServicePublication: SorterService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Spectrum)) private readonly sorterServiceSpectrum: SorterService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) private readonly sorterServiceProjects: SorterService,
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }

  /** Initialization */
  Initialize() {
    switch (this.sorterKind) {
      case SorterKind.Accomplishments: this.sorterService = this.sorterServiceAccomplishment; break;
      case SorterKind.Publications: this.sorterService = this.sorterServicePublication; break;
      case SorterKind.Spectrum: this.sorterService = this.sorterServiceSpectrum; break;
      case SorterKind.Projects: this.sorterService = this.sorterServiceProjects; break;
    }
  }
}

import { Component, Inject, Input, AfterViewInit } from '@angular/core';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { Go } from '../../enums/go.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * Sorter component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements AfterViewInit {
  /** The sorter component target type. */
  @Input() type = '';

  /** The sorter component target sort fields key. */
  #sortFieldsKey!: SorterKind;
  /** Sort field key getter. */
  public get sortFieldsKey() {
    return this.#sortFieldsKey;
  }
  /** Sort field key setter. */
  @Input() public set sortFieldsKey(value) {
    if (this.#sortFieldsKey !== value) {
      this.#sortFieldsKey = value;
      this.Initialize();
    }
  }

  /** The proper sorter service to use. */
  public sorterService!: SorterService;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Sort field index getter delegate. */
  public get sortFieldIndex() { return this.sorterService?.sortFieldIndex ?? 0; }
  /** Sort field index setter delegate. */
  public set sortFieldIndex(value) { if (this.sorterService && value) { this.sorterService.sortFieldIndex = value; } }

  /** Sort order getter delegate. */
  public get sortOrder() { return this.sorterService?.sortOrder ?? 0; }
  /** Sort order setter delegate. */
  public set sortOrder(value) { if (this.sorterService && value) { this.sorterService.sortOrder = value; } }

  /** Sort field index order direction getter. */
  public get sortFieldIndexOrderDirection() { return this.sortOrderDirection[this.sortOrder]; }

  /** Sort order direction getter. */
  public get sortOrderDirection() { return this.sorterService?.sortOrderDirection; }

  /** Next forward getter. */
  public get nextForward() { return this.sortFieldIndexNextDirection[Go.Forward]; }

  /** Next back getter. */
  public get nextBack() { return this.sortFieldIndexNextDirection[Go.Back]; }

  /** Sort field index next direction getter delegate. */
  public get sortFieldIndexNextDirection() { return this.sorterService?.sortFieldIndexNextDirection; }

  /** Is in natural order predicate getter delegate. */
  public get isInNaturalOrder() { return this.sorterService.isInNaturalOrder; }

  /**
   * Constructs the sorter component.
   * ~constructor
   *
   * @param sorterServiceAccomplishment The accomplishment sorter service injected dependency.
   * @param sorterServicePublication The publication sorter service injected dependency.
   * @param sorterServiceSpectrum The spectrum sorter service injected dependency.
   * @param sorterServiceProjects The projects sorter service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    @Inject(SorterService.tokenDescription(SorterKind.Accomplishments)) public sorterServiceAccomplishment: SorterService,
    @Inject(SorterService.tokenDescription(SorterKind.Publications)) public sorterServicePublication: SorterService,
    @Inject(SorterService.tokenDescription(SorterKind.Spectrum)) public sorterServiceSpectrum: SorterService,
    @Inject(SorterService.tokenDescription(SorterKind.Projects)) public sorterServiceProjects: SorterService,
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    public uiService: UiService,
  ) {
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    switch (this.sortFieldsKey) {
      case SorterKind.Accomplishments: this.sorterService = this.sorterServiceAccomplishment; break;
      case SorterKind.Publications: this.sorterService = this.sorterServicePublication; break;
      case SorterKind.Spectrum: this.sorterService = this.sorterServiceSpectrum; break;
      case SorterKind.Projects: this.sorterService = this.sorterServiceProjects; break;
    }
  }

  /** Sort field getter delegate. */
  public sortField(value: number) { return this.sorterService?.sortField(value); }

  /** Next sort delegate. */
  nextSort(event: MouseEvent, back = false) {
    this.sorterService.nextSort(event, back ? Go.Back : Go.Forward);
  }

  /** Next sort title delegate. */
  public nextSortTitle(back = false) {
    return this.sorterService?.nextSortTitle(back ? Go.Back : Go.Forward) ?? '';
  }

  /** Truncated collection delegate. */
  public truncated(collection: any[]): any[] {
    return this.sorterService?.truncated(collection) ?? [];
  }

  /** Sorted collection delegate. */
  public sorted(collection: any[]): any[] {
    return this.sorterService.sorted(collection) ?? [];
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.sorterService.keypress(event);
  }
}

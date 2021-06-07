import { Component, AfterViewInit, ViewChildren, QueryList, Inject } from '@angular/core';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { HeaderComponent } from '../header/header.component';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

/**
 * Project summary component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements AfterViewInit {
  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /** SorterKind enum accessor. */
  public get SorterKind() { return SorterKind; }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /**
   * Constructs the Project summary component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Spectrum)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Ps)) public readonly truncatorService: TruncatorService,
    private readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService
  ) {
  }

  /** Tag cloud delegate. */
  public get tagCloud(): TagCloudDisplayMode {
    return this.portfolioService.toolbarService.tagCloud;
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Project Summary'].forEach((_) => this.persistenceService.restoreToggle(document, _));
    ['Areas of Expertise', 'Skills', 'Job Functions'].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Get frequencies cache delegate. */
  public getFrequenciesCache(frequenciesCacheKey: string): any[] {
    return this.portfolioService.getFrequenciesCache(frequenciesCacheKey);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

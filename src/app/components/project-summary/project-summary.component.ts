import { Component, AfterViewInit, Input, TemplateRef, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

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
  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** Frequency group clickable element. */
  @ViewChildren('clickable') clickable?: QueryList<ElementRef>;

  /** Frequencies clickable element. */
  @ViewChildren('clickables') clickables?: QueryList<ElementRef>;

  /** Frequency index clickable element. */
  @ViewChildren('clickableIndex') clickableIndex?: QueryList<ElementRef>;

  /** Frequency map clickable element. */
  @ViewChildren('clickableMap') clickableMap?: QueryList<ElementRef>;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Tag cloud display mode. */
  public TagCloudDisplayMode = TagCloudDisplayMode;

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /**
   * Constructs the Project summary component.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    public persistenceService: PersistenceService
    ) {
  }

  /** Tag cloud delegate. */
  get tagCloud(): TagCloudDisplayMode {
    return this.portfolioService.tagCloud;
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Project Summary'].forEach(_ => this.persistenceService.restoreToggle(document, _));
    ['Areas of Expertise', 'Skills', 'Job Functions'].forEach(_ => this.persistenceService.restoreToggle(document, _));
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.persistenceService.restoreToggle(document, typeName);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
 }
}

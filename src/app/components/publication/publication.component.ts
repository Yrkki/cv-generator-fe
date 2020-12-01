import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { PublicationIndexComponent } from '../publication-index/publication-index.component';
import { PublicationListComponent } from '../publication-list/publication-list.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from '../../interfaces/indexable';

/**
 * Publication component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements AfterViewInit {
  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** Publications clickable element. */
  @ViewChild('clickablePublications') clickablePublications?: ElementRef;

  /** Publication index clickable element. */
  @ViewChild('clickablePublicationIndex') clickablePublicationIndex?: ElementRef;

  /** Publication list clickable element. */
  @ViewChild('clickablePublicationList') clickablePublicationList?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Publication index component ComponentOutlet hook. */
  public PublicationIndexComponent = PublicationIndexComponent;
  /** Publication list component ComponentOutlet hook. */
  public PublicationListComponent = PublicationListComponent;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Accomplishments component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    private persistenceService: PersistenceService,
    private injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Publications',
      'Publications Index',
      'Publications List'
    ].forEach(_ => this.persistenceService.restoreToggle(document, _));
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

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Truncated collection. */
  public truncated(collection: any[]): any[] {
    return this.portfolioService.truncated(collection, undefined, this.entities.Accomplishments?.key);
  }

  /** Remaining collection. */
  public remaining(collection: any[]): any[] {
    return this.portfolioService.remaining(collection, undefined, this.entities.Accomplishments?.key);
  }
}

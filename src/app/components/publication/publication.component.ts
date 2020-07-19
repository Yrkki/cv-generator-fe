import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { PublicationIndexComponent } from '../publication-index/publication-index.component';
import { PublicationListComponent } from '../publication-list/publication-list.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from 'src/app/interfaces/indexable';

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
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Filtered publications delegate. */
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

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
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public injector: Injector,
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
    ].forEach(_ => this.restoreToggle(document, _));
  }

  /** Count delegate. */
  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.portfolioComponent.restoreToggle(document, typeName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
  }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }
}

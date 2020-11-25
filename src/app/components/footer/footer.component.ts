import { Component, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

import BadgeConfigJSON from './badge.config.json';

/**
 * Footer component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {
  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** The app version string. */
  public version = '';

  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** The component key */
  protected key = 'Badges';

  /** Badges config. */
  public get BadgeConfig() { return BadgeConfigJSON; }

  /** Badges leaves count. */
  public get BadgeLeavesCount() { return this.BadgeConfig.map(_ => _.length).reduce((acc, bin) => acc + bin ); }

  /** The expand badges element. */
  @ViewChild('expandBadgesElement') expandBadgesElement?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Expand badges decorated clickable element. */
  @ViewChild('clickableExpandBadgesDecorated') clickableExpandBadgesDecorated?: ElementRef;

  /** Expand badges clickable element. */
  @ViewChild('clickableExpandBadges') clickableExpandBadges?: ElementRef;

  /** Expand badges toggle getter. */
  get ExpandBadges() {
    return this.persistenceService.getItem('ExpandBadges') === 'true';
  }
  /** Expand badges toggle setter. */
  @Input() set ExpandBadges(value) {
    this.persistenceService.setItem('ExpandBadges', value.toString());
  }

  /** The server url. */
  private readonly qualifiedHostname = globalThis.location.protocol + '//' + globalThis.location.hostname;

  /**
   * Constructs the Footer component.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    public persistenceService: PersistenceService,
    private dataService: DataService
  ) { }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    this.portfolioService.countCache.Badges = this.BadgeLeavesCount;

    this.getVersion();

    if (!this.persistenceService.getItem(this.key) ) {
      // reverse default
      this.persistenceService.setItem(this.key, JSON.stringify({ 'content-class': 'collapse' }));
    }
    this.persistenceService.restoreToggle(document, this.key);
  }

  /** Loads the Version. */
  private getVersion(): void {
    this.dataService.getVersion().pipe(take(1)).subscribe((version) => {
      try {
        this.version = version.builds[0].version.replace('-', '–');
      } catch (error) { }
      finally { }
    });
  }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Preprocess url. */
  public preprocessUrl(url: string): string {
    return this.replaceAll(url, '{{ qualifiedHostname }}', this.qualifiedHostname);
  }

  /** Whether an object is empty delegate. */
  isEmpty(obj: object): boolean {
    return this.portfolioService.isEmpty(obj);
  }

  /** Get an asset image delegate. */
  getAssetUri(imageName: string): string {
    return this.uiService.getAssetUri(imageName);
  }

  /** Label delegate. */
  label(key: string): string {
    return this.uiService.label(key);
  }

  /** Link label delegate. */
  linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
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

  /** Replace all delegate. */
  private replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return this.portfolioService.replaceAll(str, search, replacement);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

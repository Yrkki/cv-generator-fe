import { Component, AfterViewInit, Input, TemplateRef, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

import ConfigJSON from './badge.config.json';

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
  public get key() { return 'Footer'; }

  /** The expand component key */
  public get expandKey() { return ['Expand', this.key].join(' '); }

  /** Config. */
  public get Config() { return ConfigJSON; }

  /** Leaves count. */
  public get LeavesCount() { return this.Config.map(_ => _.length).reduce((acc, bin) => acc + bin); }

  /** A clickable element. */
  @ViewChildren('clickable') clickable?: QueryList<ElementRef>;

  /** Expand toggle getter. */
  public get Expand() {
    return this.persistenceService.getItem(this.expandKey) === 'true';
  }
  /** Expand toggle setter. */
  @Input() public set Expand(value) {
    this.persistenceService.setItem(this.expandKey, value.toString());
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
    public inputService: InputService,
    public uiService: UiService,
    public persistenceService: PersistenceService,
    public dataService: DataService
  ) { }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    setTimeout(() => this.portfolioService.countCache[this.key] = this.LeavesCount);

    this.getVersion();

    if (!this.persistenceService.getItem(this.key)) {
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
    url = this.replaceAll(url, '{{ qualifiedHostname }}', this.qualifiedHostname);
    url = this.replaceAll(url, '{{ version }}', this.version);
    return url;
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

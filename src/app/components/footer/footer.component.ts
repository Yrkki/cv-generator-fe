import { Component, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioComponent } from '../portfolio/portfolio.component';
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
  public get ui() { return this.portfolioComponent.ui; }

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

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
    return localStorage.getItem('ExpandBadges') === 'true';
  }
  /** Expand badges toggle setter. */
  @Input() set ExpandBadges(value) {
    localStorage.setItem('ExpandBadges', value.toString());
  }

  /**
   * Constructs the Footer component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService
  ) { }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.getVersion();

    if (!localStorage.getItem(this.key) ) {
      // reverse default
      localStorage.setItem(this.key, JSON.stringify({ 'content-class': 'collapse' }));
    }
    this.restoreToggle(document, this.key);
  }

  /** Loads the Version. */
  private getVersion(): void {
    this.dataService.getVersion().pipe(take(1)).subscribe((version) => {
      try {
        this.version = version.builds[0].version;
      } catch (error) { }
      finally { }
    });
  }

  /** UI safe text. */
  public uiText(key: string): string {
    return decodeURI(this.ui[key]?.text ?? key);
  }

  /** Whether an object is empty delegate. */
  isEmpty(obj: object): boolean {
    return this.portfolioComponent.isEmpty(obj);
  }

  /** Get an asset image delegate. */
  getAssetUri(imageName: string): string {
    return this.portfolioComponent.getAssetUri(imageName);
  }

  /** Label delegate. */
  label(key: string): string {
    return this.portfolioComponent.label(key);
  }

  /** Link label delegate. */
  linkLabel(key: string | undefined): string {
    return this.portfolioComponent.linkLabel(key);
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

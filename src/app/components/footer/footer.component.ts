import { Component, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

import { HeaderComponent } from '../header/header.component';

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
  /** The app version string. */
  public version = '';

  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** The component key */
  public get key() { return 'Footer'; }

  /** The expand component key */
  public get expandKey() { return ['Expand', this.key].join(' '); }

  /** Config. */
  public get Config() { return ConfigJSON; }

  /** Leaves count. */
  public get LeavesCount() { return this.Config.map((_) => _.length).reduce((acc, bin) => acc + bin); }

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Expand toggle getter. */
  public get Expand() {
    return this.persistenceService.getItem(this.expandKey) === 'true';
  }
  /** Expand toggle setter. */
  @Input() public set Expand(value) {
    this.persistenceService.setItem(this.expandKey, value.toString());
  }

  /** The server url. */
  public readonly qualifiedHostname = globalThis.location.protocol + '//' + globalThis.location.hostname;

  /**
   * Constructs the Footer component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public readonly dataService: DataService
  ) { }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    setTimeout(() => this.portfolioService.model.entitiesModel.countCache[this.key] = this.LeavesCount);

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
      } catch (error) {
        // empty
      }
    });
  }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Get an asset image delegate. */
  getAssetUri(imageName: string): string {
    return this.uiService.imageService.getAssetUri(imageName);
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

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

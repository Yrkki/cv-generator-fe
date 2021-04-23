import { AfterViewInit, Component, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { Entity } from '../../interfaces/entities/entity';

/**
 * Navigation component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  /** The component key */
  public get key() { return 'Navigation'; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Instance identification position: '' (top) or ' bottom' (bottom). */
  @Input() position: any;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.localizationService.linkToThisText; }

  /** Formatted section counter */
  public count(key: string) { return this.entitiesService.getCountValueFormatted(key); }

  /**
   * Constructs the Navigation component.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    public generalTimelineService: GeneralTimelineService,
    private uiService: UiService,
    public persistenceService: PersistenceService
  ) {
  }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    if (!this.persistenceService.getItem(this.key)) {
      // reverse default
      this.persistenceService.setItem(this.key, JSON.stringify({ 'content-class': 'collapse' }));
    }
    this.persistenceService.restoreToggle(document, this.key);
  }

  /** Tab name delegate. */
  public tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /**
   * Decorates a main section.
   * @param key The entity key.
   *
   * @returns The processed section name.
   */
  public decorateMain(key: string) {
    const entity: Entity = this.entities?.[key];
    return entity?.main === 'true'
      ? entity?.section.toUpperCase()
      : entity?.section
      ?? '';
  }

  /**
   * Makes spaces in a section name non-breaking.
   * @param sectionName The name of the section to process.
   *
   * @returns The processed section name.
   */
  public nonBreaking(sectionName: string) {
    return sectionName ? this.replaceAll(sectionName, ' ', this.uiService.nonBreakingSpace) : ''; // &nbsp;
  }

  /** Replace all delegate. */
  private replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Count cache, aggregation or fixed collection length value delegate. */
  public getCountValue(key: string): number { return this.entitiesService.getCountValue(key); }
}

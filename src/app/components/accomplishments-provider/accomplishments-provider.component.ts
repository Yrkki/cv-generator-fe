import { Component } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * AccomplishmentsProvider component.
 */
@Component({
  selector: 'app-accomplishments-provider',
  templateUrl: './accomplishments-provider.component.html',
  styleUrls: ['./accomplishments-provider.component.scss']
})
export class AccomplishmentsProviderComponent {
  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioService.model.portfolioModel.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.model.portfolioModel.filtered; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /**
   * Constructs the AccomplishmentsProvider component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    protected readonly inputService: InputService,
    public readonly uiService: UiService,
    protected readonly persistenceService: PersistenceService,
  ) { }

  /** Tab name delegate. */
  public tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  public saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Restore toggle delegate. */
  public restoreToggle(document: Document, typeName: string) {
    this.persistenceService.restoreToggle(document, typeName);
  }

  /** Simulate keyboard clicks delegate. */
  public keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /**
   *  Whether projects are defined.
   * ~delegate
   *
   * @returns Whether the projects are defined.
   */
  public projectsDefined(): boolean {
    return this.portfolioService.projectsDefined();
  }
}

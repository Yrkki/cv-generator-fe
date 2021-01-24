import { Component, ElementRef, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

/**
 * expand-toggle component.
 */
@Component({
  selector: 'app-expand-toggle',
  templateUrl: './expand-toggle.component.html',
  styleUrls: ['./expand-toggle.component.scss']
})
export class ExpandToggleComponent {
  /** The component key */
  @Input() public key = 'ExpandToggle';

  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** The expand component key */
  public get expandKey() { return ['Expand', this.key].join(' '); }

  /** The expand element. */
  @ViewChildren('expandElement') expandElement?: QueryList<ElementRef>;

  /** Expand decorated clickable element. */
  @ViewChildren('clickableExpandDecorated') clickableExpandDecorated?: QueryList<ElementRef>;

  /** Expand clickable element. */
  @ViewChildren('clickableExpand') clickableExpand?: QueryList<ElementRef>;

  /** Expand toggle getter. */
  public get Expand() {
    return this.persistenceService.getItem(this.expandKey) === 'true';
  }
  /** Expand toggle setter. */
  @Input() public set Expand(value) {
    this.persistenceService.setItem(this.expandKey, value.toString());
  }

  /**
   * Constructs the expand-toggle component.
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

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Label delegate. */
  label(key: string): string {
    return this.uiService.label(key);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

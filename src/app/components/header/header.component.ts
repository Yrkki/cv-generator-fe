import { Component, Input, TemplateRef, ElementRef, ViewChild } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';

/**
 * Header component.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** The component key */
  @Input() public key = 'Header';

  /** The expand component key */
  public get expandKey() { return ['Expand', this.key].join(' '); }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Expand toggle getter. */
  public get Expand() {
    return this.persistenceService.getItem(this.expandKey) === 'true';
  }
  /** Expand toggle setter. */
  public set Expand(value) {
    this.persistenceService.setItem(this.expandKey, value.toString());
  }

  /**
   * Constructs the Header component.
   * ~constructor
   *
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
    private persistenceService: PersistenceService,
  ) { }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

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

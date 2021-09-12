// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component, Input, ElementRef, ViewChild } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { HeaderTitleComponent } from '../header-title/header-title.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** The component key */
  @Input() public key = 'Header';

  /** The heading level */
  @Input() public headingLevel = 1;

  /** Next sort synced index entity panel element. */
  @Input() public nextSortElement?: HTMLElement;

  /** Toggles */
  @Input() public toggles: ToggleKind[] = [];

  /** Edit mode only */
  @Input() public editModeOnly = false;

  /** Header clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLDivElement>;

  /** The header title element. */
  @ViewChild('headerTitle') headerTitle!: HeaderTitleComponent;

  /** The toolbar element. */
  @ViewChild('toolbar') toolbar!: ToolbarComponent;

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
}

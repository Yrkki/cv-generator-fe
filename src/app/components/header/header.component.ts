// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.entities; }

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

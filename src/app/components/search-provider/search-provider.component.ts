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
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';

/**
 * SearchProvider component
 */
@Component({
  selector: 'app-search-provider',
  templateUrl: './search-provider.component.html',
  styleUrls: ['./search-provider.component.scss']
})
export class SearchProviderComponent {
  /** Instance identification position. */
  @Input() public position: any;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** Instant search toggle getter. */
  public get InstantSearch() {
    return this.persistenceService.getItem('InstantSearch') === 'true';
  }
  /** Instant search toggle setter. */
  @Input() public set InstantSearch(value) {
    this.persistenceService.setItem('InstantSearch', value.toString());
  }

  /** Search token getter delegate. */
  public get SearchToken(): string {
    return this.engine.searchService.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() public set SearchToken(value: string) {
    // console.debug('SearchProviderComponent: SearchToken: firing: ', value);
    this.engine.searchService.SearchToken = value;
  }

  /** SearchProvider token changed event. */
  public searchTokenChanged$: Subject<string> = new Subject<string>();

  /**
   * Constructs the SearchProvider component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    protected readonly engine: EngineService,
    protected readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /** Simulate keyboard clicks delegate. */
  public keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** Clear search-provider field. */
  public clearSearch() {
    this.SearchToken = '';
  }

  /** Clear toggle state and any future view state and start all over. */
  public startAllOver() {
    this.clearSearch();
    this.persistenceService.clear();
    this.windowReload();
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }

  /** Label delegate. */
  public label(key: string): string {
    return this.uiService.label(key);
  }
}

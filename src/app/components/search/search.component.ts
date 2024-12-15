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
import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchProviderComponent } from '../search-provider/search-provider.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { SearchHistoryService } from '../../services/search-history/search-history.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ToolbarComponent } from '../toolbar/toolbar.component';

/**
 * Search component
 * ~extends {@link SearchProviderComponent}
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  standalone:false,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends SearchProviderComponent implements OnInit, OnDestroy {
  /**
   * Search filed entry debounce time in milliseconds.
   *
   * @description Can slow down event response time before searching if set to a value greater than zero.
   */
  private searchFieldEntryDebounceTime = 200;

  /** The search text element. */
  @ViewChild('searchTextElement') searchTextElement!: ElementRef<HTMLInputElement>;

  /** Search clickable element. */
  @ViewChild('clickableSearch') clickableSearch?: ElementRef;

  /** Clear search clickable element. */
  @ViewChild('clickableClearSearch') clickableClearSearch?: ElementRef;

  /** Start all over clickable element. */
  @ViewChild('clickableStartAllOver') clickableStartAllOver?: ElementRef;

  /** The toolbar element. */
  @ViewChild('toolbar') toolbar!: ToolbarComponent;

  /** Search token sunscription holder. */
  private instantSearchSubscription$: Subscription = new Subscription();

  /**
   * Constructs the Search component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param searchHistoryService The search history service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    protected override readonly engine: EngineService,
    protected override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public readonly searchHistoryService: SearchHistoryService,
    public override readonly persistenceService: PersistenceService,
  ) {
    super(portfolioService, engine, inputService, uiService, persistenceService);
  }

  /** Subscription */
  ngOnInit() {
    if (this.InstantSearch) {
      this.instantSearchSubscribe();
    }
  }

  /** Clean up upon desctuction of the component. */
  ngOnDestroy(): void {
    // console.debug('SearchComponent: InstantSearch: unsubscribing (cleanup)');
    this.instantSearchUnsubscribe();
  }

  /** Instant search subscription subscribe. */
  private instantSearchSubscribe(): void {
    // console.debug('SearchComponent: InstantSearch: subscribing');
    const debounced = this.searchTokenChanged$.pipe(
      debounceTime(this.searchFieldEntryDebounceTime), // wait a bit after the last event before emitting last event
      distinctUntilChanged()); // only emit if value is different from previous value

    this.instantSearchSubscription$ = this.instantSearchSubscriptionDebounced(debounced);
  }

  /** Instant search subscription subscription debounced. */
  private instantSearchSubscriptionDebounced(searchTokenChanged: Observable<string>) {
    return searchTokenChanged.subscribe((_) => { this.SearchToken = _; });
  }

  /** Instant search subscription unsubscribe. */
  private instantSearchUnsubscribe(): void {
    // console.debug('SearchComponent: InstantSearch: unsubscribing');
    this.instantSearchSubscription$.unsubscribe();
  }

  /** Instant search toggled event handler. */
  onInstantSearchToggled(value: boolean) {
    if (value) {
      this.instantSearchSubscribe();
    } else {
      this.instantSearchUnsubscribe();
    }
  }

  /** Field change event handler. */
  onFieldChange(query: string) {
    if (this.InstantSearch) {
      this.searchTokenChanged$.next(query);
    } else {
      this.searchHistoryService.updateHintSearch(query);
    }
  }

  /** Connect the keyboard. */
  public keydown(event: KeyboardEvent) {
    this.searchHistoryService.keydown(event);

    switch (event.key) {
      case 'Enter': this.processKeydownEnter(event); break;
      case 'Delete': this.processKeydownDelete(event); break;
    }
  }

  /** Process keydown enter. */
  private processKeydownEnter(event: KeyboardEvent) {
    if (event.shiftKey) {
      if (this.searchHistoryService.newSearchTokenSuggestion !== this.SearchToken) {
        (this.searchTextElement.nativeElement as HTMLInputElement).value = this.searchHistoryService.newSearchTokenSuggestion;
      }
    }
    this.search();
  }

  /** Process keydown delete. */
  private processKeydownDelete(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.clearSearch();
    } else if (event.ctrlKey) {
      this.startAllOver();
    }
  }

  /** Do search. */
  public search() {
    this.SearchToken = this.searchTextElement.nativeElement.value;
    this.searchHistoryService.saveSearchToHistory(this.engine.searchService.SearchToken);
  }
}

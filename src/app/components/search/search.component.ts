import { Component, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { SearchHistoryService } from '../../services/search-history/search-history.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ToggleComponent } from '../toggle/toggle.component';
import { ToggleKind } from '../../enums/toggle-kind.enum';

/**
 * Search component
 * ~implements {@link OnDestroy}
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  /**
   * Search filed entry debounce time in milliseconds.
   * @description Can slow down event response time before searching if set to a value greater than zero.
   */
  private searchFieldEntryDebounceTime = 200;

  /** Instance identification position: '' (top) or ' bottom' (bottom). */
  @Input() position: any;

  /** The search text element. */
  @ViewChild('searchTextElement') searchTextElement!: ElementRef<HTMLInputElement>;

  /** Search clickable element. */
  @ViewChild('clickableSearch') clickableSearch?: ElementRef;

  /** Clear search clickable element. */
  @ViewChild('clickableClearSearch') clickableClearSearch?: ElementRef;

  /** Start all over clickable element. */
  @ViewChild('clickableStartAllOver') clickableStartAllOver?: ElementRef;

  /** The instant search toggle element. */
  @ViewChild('instantSearchToggle') instantSearchToggle!: ElementRef<ToggleComponent>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** Instant search toggle getter. */
  get InstantSearch() {
    return this.persistenceService.getItem('InstantSearch') === 'true';
  }
  /** Instant search toggle setter. */
  @Input() set InstantSearch(value) {
    this.persistenceService.setItem('InstantSearch', value.toString());
  }

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioService.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    // console.log('Debug: SearchToken: firing: ', value);
    this.portfolioService.SearchToken = value;
  }

  /** Search token sunscription holder. */
  private instantSearchSubscription$: Subscription = new Subscription();

  /** Search token changed event. */
  searchTokenChanged$: Subject<string> = new Subject<string>();

  /**
   * Constructs the Search component.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param searchHistoryService The search history service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    private readonly inputService: InputService,
    private readonly uiService: UiService,
    public readonly searchHistoryService: SearchHistoryService,
    public readonly persistenceService: PersistenceService,
  ) {
    if (this.InstantSearch) {
      this.instantSearchSubscribe();
    }
  }

  /** Clean up upon desctuction of the component. */
  ngOnDestroy(): void {
    // console.log('Debug: InstantSearch: unsubscribing (cleanup)');
    this.instantSearchUnsubscribe();
  }

  /** Instant search subscription subscribe. */
  instantSearchSubscribe(): void {
    // console.log('Debug: InstantSearch: subscribing');
    this.instantSearchSubscription$ = this.searchTokenChanged$.pipe(
      debounceTime(this.searchFieldEntryDebounceTime), // wait a bit after the last event before emitting last event
      distinctUntilChanged()) // only emit if value is different from previous value
      .subscribe((_) => { this.SearchToken = _; });
  }

  /** Instant search subscription unsubscribe. */
  instantSearchUnsubscribe(): void {
    // console.log('Debug: InstantSearch: unsubscribing');
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

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** Connect the keyboard. */
  keydown(event: KeyboardEvent) {
    this.searchHistoryService.keydown(event);

    switch (event.key) {
      case 'Enter':
        if (event.shiftKey) {
          if (this.searchHistoryService.newSearchTokenSuggestion !== this.SearchToken) {
            (this.searchTextElement?.nativeElement as HTMLInputElement).value = this.searchHistoryService.newSearchTokenSuggestion;
          }
        }
        this.search();
        break;

      case 'Delete':
        if (event.shiftKey) {
          this.clearSearch();
        } else if (event.ctrlKey) {
          this.startAllOver();
        }
        break;
    }
  }

  /** Do search. */
  search() {
    this.SearchToken = this.searchTextElement?.nativeElement.value;
    this.searchHistoryService.saveSearchToHistory(this.portfolioService.SearchToken);
  }

  /** Clear search field. */
  clearSearch() {
    this.SearchToken = '';
  }

  /** Clear toggle state and any future view state and start all over. */
  startAllOver() {
    this.clearSearch();
    this.persistenceService.clear();
    this.windowReload();
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }

  /** Label delegate. */
  label(key: string): string {
    return this.uiService.label(key);
  }
}

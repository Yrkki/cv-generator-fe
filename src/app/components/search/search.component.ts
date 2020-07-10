import { Component, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  /** Search clickable element. */
  @ViewChild('clickableSearch') clickableSearch: ElementRef;

  /** Clear search clickable element. */
  @ViewChild('clickableClearSearch') clickableClearSearch: ElementRef;

  /** Start all over clickable element. */
  @ViewChild('clickableStartAllOver') clickableStartAllOver: ElementRef;

  /** Instant search decorated clickable element. */
  @ViewChild('clickableInstantSearchDecorated') clickableInstantSearchDecorated: ElementRef;

  /** Instant search clickable element. */
  @ViewChild('clickableInstantSearch') clickableInstantSearch: ElementRef;

  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** The search text element. */
  @ViewChild('searchTextElement') searchTextElement: ElementRef;

  /** The search element. */
  @ViewChild('searchElement') searchElement: ElementRef;

  /** Instant search toggle getter. */
  get InstantSearch() {
    return localStorage.getItem('InstantSearch') === 'true';
  }
  /** Instant search toggle setter. */
  @Input() set InstantSearch(value) {
    if (value) {
      this.instantSearchSubscribe();
    } else {
      this.instantSearchUnsubscribe();
    }

    localStorage.setItem('InstantSearch', value.toString());
  }

  /** Search token sunscription holder. */
  private instantSearchSubscription$: Subscription = new Subscription();

  /** Search token changed event. */
  searchTokenChanged$: Subject<string> = new Subject<string>();

  /**
   * Constructs the Search component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
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
      .subscribe(_ => { this.SearchToken = _; });
  }

  /** Instant search subscription unsubscribe. */
  instantSearchUnsubscribe(): void {
      // console.log('Debug: InstantSearch: unsubscribing');
      this.instantSearchSubscription$.unsubscribe();
  }

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioComponent.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    // console.log('Debug: SearchToken: firing: ', value);
    this.portfolioComponent.SearchToken = value;
  }

  /** Field change event handler. */
  onFieldChange(query: string) {
    if (this.InstantSearch) {
      this.searchTokenChanged$.next(query);
    }
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event) {
    this.portfolioComponent.keypress(event);
  }

  /** Connect the keyboard. */
  keydown(event) {
    switch (event.key) {
      case 'Enter':
        this.search();
        break;

      case 'Delete':
        if (event.shiftKey) {
          this.clearSearch();
        } else if (event.ctrlKey) {
          this.startAllOver();
        }
        break;

      default:
        break;
    }
  }

  /** Do search. */
  search() {
    this.SearchToken = this.searchTextElement.nativeElement.value;
  }

  /** Clear search field. */
  clearSearch() {
    this.SearchToken = '';
  }

  /** Clear toggle state and any future view state and start all over. */
  startAllOver() {
    this.clearSearch();
    localStorage.clear();
    this.windowReload();
  }

  /** Reload window. */
  windowReload() {
    globalThis.location.reload();
  }

  /** Label delegate. */
  label(key: string): string {
    return this.portfolioComponent.label(key);
  }
}

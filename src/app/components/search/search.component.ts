import { Component, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Search component
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

  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** The search text element. */
  @ViewChild('SearchTextElement') SearchTextElement: ElementRef;

  /** The search element. */
  @ViewChild('SearchElement') SearchElement: ElementRef;

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
      .subscribe(_ => { this.searchToken = _; });
  }

  /** Instant search subscription unsubscribe. */
  instantSearchUnsubscribe(): void {
      // console.log('Debug: InstantSearch: unsubscribing');
      this.instantSearchSubscription$.unsubscribe();
  }

  /** Search token getter delegate. */
  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  /** Search token setter delegate. */
  @Input() set searchToken(value: string) {
    // console.log('Debug: searchToken: firing: ', value);
    this.portfolioComponent.searchToken = value;
  }

  /** Field change event handler. */
  onFieldChange(query: string) {
    if (this.InstantSearch) {
      this.searchTokenChanged$.next(query);
    }
  }

  /** Hook up the keyboard. */
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
    this.searchToken = this.SearchTextElement.nativeElement.value;
  }

  /** Clear search field. */
  clearSearch() {
    this.searchToken = '';
  }

  /** Clear toggle state and any future view state and start all over. */
  startAllOver() {
    this.clearSearch();
    localStorage.clear();
    this.windowReload();
  }

  /** Reload window. */
  windowReload() {
    window.location.reload();
  }

  /** Label delegate. */
  label(key: string): string {
    return this.portfolioComponent.label(key);
  }
}

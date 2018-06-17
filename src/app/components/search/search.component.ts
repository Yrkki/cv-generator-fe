import { Component, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Search component
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /**
   * Search filed entry debounce time in milliseconds.
   * @description Can slow down event response time before searching if set to a value greater than zero.
   */
  private searchFieldEntryDebounceTime = 200;

  /** Instance identification position: '' (top) or ' bottom' (bottom). */
  @Input() position: any;

  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Search token changed event. */
  searchTokenChanged: Subject<string> = new Subject<string>();

  /**
   * Constructs the Search component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.searchTokenChanged.pipe(
      debounceTime(this.searchFieldEntryDebounceTime), // wait a bit after the last event before emitting last event
      distinctUntilChanged()) // only emit if value is different from previous value
      .subscribe(_ => { this.searchToken = _; });
  }

  /** Search token getter delegate. */
  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  /** Search token setter delegate. */
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  /** Field change event handler. */
  onFieldChange(query: string) {
    this.searchTokenChanged.next(query);
  }

  /** Clear search field. */
  clearSearch() {
    this.searchToken = '';
  }

  /** Clear toggle state and any future view state and start all over. */
  startAllOver() {
    this.clearSearch();
    localStorage.clear();
    window.location.reload();
  }
}

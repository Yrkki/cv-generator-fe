import { Injectable } from '@angular/core';
import { PersistenceService } from '../persistence/persistence.service';

/**
 * Search history service.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  /** Search history maximum number of items. */
  public readonly searchHistoryMaxLength = 30;
  /** Search history placeholder shown, when suggestions hint empty. */
  public readonly searchHistoryEmptyPlaceholder = '...';

  /** New pending search token suggestion. */
  public newSearchTokenSuggestion = '';

  /** Search history suggestions hint . */
  public hintSearch = [this.searchHistoryEmptyPlaceholder];

  /** First suggestion of the search history matches. */
  public get hintSearchHead() { return this.hintSearch[0]; }
  /** Search history suggestions hint shown. */
  public get hintSearchString() { return this.hintSearch.join(', '); }

  /** Search history getter. */
  public get searchHistory(): string[] {
    return JSON.parse(
      this.persistenceService.getItem('Search history')
      ?? JSON.stringify(new Array<string>())
    );
  }
  /** Search history setter. */
  public set searchHistory(value: string[]) {
    this.persistenceService.setItem('Search history', JSON.stringify(value));
  }

  /**
   * Constructs the search history service.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(private persistenceService: PersistenceService) { }

  /**
   * Updates the search history suggestions hint.
   * @param persistenceService The persistence service injected dependency.
   */
  public updateHintSearch(query: string): void {
    query = query.trim();

    let hintSearch;
    if (query) {
      hintSearch = this.searchHistory
        .filter((h) => h?.toLowerCase().includes(query.toLowerCase()))
        .sort((l, r) => r.length - l.length);
    }
    if (!hintSearch || hintSearch.length < 1) { hintSearch = [this.searchHistoryEmptyPlaceholder]; }
    this.hintSearch = hintSearch;
  }

  /** Save search to history. */
  public saveSearchToHistory(searchToken: string) {
    const newSearchItem = searchToken.trim();
    if (['', this.searchHistoryEmptyPlaceholder].includes(newSearchItem)) { return; }

    let searchHistory = this.searchHistory;
    if (!searchHistory.includes(newSearchItem)) {
      if (searchHistory.length >= this.searchHistoryMaxLength) { searchHistory = searchHistory.slice(1); }
      this.searchHistory = searchHistory.concat(newSearchItem);
    }
  }

  /** Respond to keyboard strokes. */
  public keydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (event.shiftKey) {
          const newSearchTokenSuggestion = this.hintSearchHead.trim();
          if (!['', this.searchHistoryEmptyPlaceholder].includes(this.hintSearchHead)) {
            this.newSearchTokenSuggestion = newSearchTokenSuggestion;
          }
        }
        break;

      case 'ArrowDown':
        if (event.shiftKey) {
          this.hintSearch = this.hintSearch.slice(1).concat(this.hintSearchHead);
        }
        break;

      case 'ArrowUp':
        if (event.shiftKey) {
          const last = this.hintSearch.length - 1;
          if (last > 0) {
            this.hintSearch = [this.hintSearch[last]].concat(this.hintSearch.slice(0, last));
          }
        }
        break;
    }
  }
}

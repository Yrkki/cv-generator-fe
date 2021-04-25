import { Injectable } from '@angular/core';
import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { StorageMechanism as Storage } from './storage';

/**
 * A persistence service.
 */
@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  /**
   * Constructs the persistence service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param storage The storage injected dependency.
   */
  constructor(
    private readonly portfolioModel: PortfolioModel,
    public readonly storage: Storage) {
  }

  /**
   * Saves the toggle state of a heading section.
   *
   * @param event The click event initiating the save.
   */
  public saveToggle(event: MouseEvent) {
    const targetElement = event.currentTarget as HTMLElement;
    if (!targetElement) { return; }
    this.setToggle(targetElement.attributes.getNamedItem('id')?.nodeValue ?? '', event.ctrlKey);
    this.setTitle(targetElement);
  }

  /**
   * Restores the toggle state of a heading section.
   *
   * @param document The document to search for a content element.
   * @param typeName The section to process.
   */
  // eslint-disable-next-line complexity
  public restoreToggle(document: Document, typeName: string) {
    if (!this.portfolioModel.entities || !this.portfolioModel.entities[typeName]) { return; }

    const contentName = this.portfolioModel.entities[typeName].content;

    const toggle = this.getToggle(typeName)?.['content-class'];

    const contentElement = document.getElementById(contentName);
    // console.log('Debug: restoreToggle: contentName:', contentName, 'contentElement:', contentElement);
    if (contentElement) {
      contentElement.className = toggle;
    }

    const typeElement = document.getElementById(typeName);
    // console.log('Debug: restoreToggle: typeName:', typeName, 'typeElement:', typeElement);
    if (typeElement) {
      if (toggle === 'collapse') {
        typeElement.className = 'collapsed';
      }
      this.setTitle(typeElement, (_) => !_);
    }
  }

  /**
   * Restores the toggle state of all heading sections.
   */
  public restoreToggleAllSections() {
    for (const entityKey in this.portfolioModel.entities) {
      if (Object.prototype.hasOwnProperty.call(this.portfolioModel.entities, entityKey)) {
        this.restoreToggle(document, entityKey);
      }
    }
  }

  /**
   * Whether toggle state of a heading section is collapsed.
   *
   * @param key The section to process.
   *
   * @returns The toggle state retrieved.
   */
  public getToggleValue(key: string) {
    return this.getToggle(key)?.['content-class'] === 'collapse';
  }

  /**
   * Retrieves the toggle state of a heading section from persistent storage.
   *
   * @param key The section to process.
   *
   * @returns The toggle state retrieved.
   */
  public getToggle(key: string): any {
    const o = { 'content-class': 'collapse show' };
    return JSON.parse(this.storage.getItem(key) ?? JSON.stringify(o)) || o;
  }

  /**
   * Toggles the state of a heading section or all of them.
   *
   * @param key The section to process.
   * @param processAllSections Indicator whether to process all sections.
   */
  private setToggle(key: string, processAllSections: boolean) {
    const element = this.getToggle(key);
    if (!element) { return; }

    const contentClass = element['content-class'] === 'collapse show' ? 'collapse' : 'collapse show';
    if (processAllSections) {
      this.restoreToggleAllSections();
    } else {
      this.storeToggle(key, element, contentClass);
    }
  }

  /**
   * Stores the toggle state of a heading section to persistent storage.
   *
   * @param key The section to process.
   * @param element The HTML element to use.
   * @param contentClass The content-class value to use.
   */
  private storeToggle(key: string, element: any, contentClass: string) {
    if (!element) { return; }
    element['content-class'] = contentClass;
    this.storage.setItem(key, JSON.stringify(element));
  }

  /**
   * Sets a tooltip title to a heading element.
   *
   * @param element The element to process.
   * @param f The function to apply to the state: defaults to repeater but can be inverter.
   */
  private setTitle(element: HTMLElement, f: (_: boolean) => boolean = (_) => _) {
    if (element) {
      element.title = this.calcTitle(f(element.classList.contains('collapsed')));
    }
  }

  /**
   * Calculates the tooltip title of a heading element based on state.
   *
   * @param condition The state to calculate the tooltip title from.
   */
  private calcTitle(condition: boolean): string {
    return this.portfolioModel.ui[condition ? 'Collapse this heading' : 'Expand this heading']?.text;
  }

  //#region "Storage delegation"

  /**
   * Returns the number of key/value pairs currently present in the list associated with the object.
   * ~override
   */
  public get length(): number { return this.storage.length; }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   * ~override
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Returns the current value associated with the given key, or null if the given key does not exist
   * in the list associated with the object.
   * ~override
   *
   * @param key The item key.
   */
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of
   * key/value pairs in the object.
   * ~override
   *
   * @param index The item index.
   */
  key(index: number): string | null {
    return this.storage.key(index);
  }

  /**
   * Removes the key/value pair with the given key from the list associated with the object,
   * if a key/value pair with the given key exists.
   * ~override
   *
   * @param key The item key.
   */
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
   * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * ~override
   *
   * @param key The item key.
   * @param value The item value.
   */
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  //#endregion "Storage delegation"
}

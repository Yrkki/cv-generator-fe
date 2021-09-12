// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';
import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { StorageMechanism as Storage } from './storage';

/**
 * A persistence service.
 */
@Injectable({
  providedIn: 'root'
})
export class PersistenceService extends Storage {
  /**
   * Constructs the persistence service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   */
  constructor(
    private readonly portfolioModel: PortfolioModel,
  ) {
    super();
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
   * @param contentName The content name to use.
   */
  public restoreToggle(document: Document, typeName: string, contentName?: string) {
    if (!contentName) {
      if (!this.portfolioModel.entities || !this.portfolioModel.entities[typeName]) { return; }

      contentName = this.portfolioModel.entities[typeName].content;
    }

    const toggle = this.getToggle(typeName)['content-class'];

    const contentElement = document.getElementById(contentName);
    // console.log('Debug: restoreToggle: contentName:', contentName, 'contentElement:', contentElement);
    if (contentElement) {
      contentElement.className = toggle;
    }

    const typeElement = document.getElementById(typeName);
    // console.log('Debug: restoreToggle: typeName:', typeName, 'typeElement:', typeElement);
    this.setTitleWhenNeeded(toggle, typeElement);
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
    return this.getToggle(key)['content-class'] === 'collapse';
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
    return JSON.parse(this.getItem(key) ?? JSON.stringify(o)) || o;
  }

  /**
   * Toggles the state of a heading section or all of them.
   *
   * @param key The section to process.
   * @param processAllSections Indicator whether to process all sections.
   */
  private setToggle(key: string, processAllSections: boolean) {
    const element = this.getToggle(key);

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
    this.setItem(key, JSON.stringify(element));
  }

  /**
   * Set title when needed.
   *
   * @param toggle The toggle collapse state value.
   * @param typeElement The HTMLElement to process.
   */
  private setTitleWhenNeeded(toggle: string, typeElement: HTMLElement | null) {
    if (typeElement) {
      if (toggle === 'collapse') {
        typeElement.className = 'collapsed';
      }
      this.setTitle(typeElement, (_) => !_);
    }
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
}

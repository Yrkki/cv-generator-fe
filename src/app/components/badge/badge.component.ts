import { Component, Input } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * Badge component.
 */
@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  /** The component key */
  #key = { Text: 'badge', Image: '', Link: '' };
  /** The component key getter */
  public get key() { return this.#key; }
  /** The component key setter */
  @Input() public set key(value) { this.#key = value; }

  /** The replacement map */
  #replacementMap: { [index: string]: string } = {};
  /** The replacement map getter */
  public get replacementMap() { return this.#replacementMap; }
  /** The replacement map setter */
  @Input() public set replacementMap(value: { [index: string]: string }) { this.#replacementMap = value; }

  /**
   * Constructs the badge component.
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    private portfolioService: PortfolioService,
    private uiService: UiService,
  ) { }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Link label delegate. */
  public linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
  }

  /** Preprocess url. */
  public preprocessUrl(url: string): string {
    for (const key in this.#replacementMap) {
      if (Object.prototype.hasOwnProperty.call(this.#replacementMap, key)) {
        const element = this.#replacementMap[key];
        url = this.replaceAll(url, `{{ ${key} }}`, element);
      }
    }
    return url;
  }

  /** Replace all delegate. */
  private replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return this.portfolioService.replaceAll(str, search, replacement);
  }
}

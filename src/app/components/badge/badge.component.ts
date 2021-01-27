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
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _key = { Text: 'badge', Image: '', Link: '' };
  /** The component key getter */
  public get key() { return this._key; }
  /** The component key setter */
  @Input() public set key(value) { this._key = value; }

  /** The replacement map */
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  private _replacementMap: { [index: string]: string } = {};
  /** The replacement map getter */
  public get replacementMap() { return this._replacementMap; }
  /** The replacement map setter */
  @Input() public set replacementMap(value: {}) { this._replacementMap = value; }

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
    for (const key in this._replacementMap) {
      if (Object.prototype.hasOwnProperty.call(this._replacementMap, key)) {
        const element = this._replacementMap[key];
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

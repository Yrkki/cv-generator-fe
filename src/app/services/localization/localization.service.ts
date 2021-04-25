import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

/**
 * A Localization service.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }

  /** Short date format */
  public readonly dateFormatShort = 'yyyy';

  /** Middle date format */
  public readonly dateFormatMiddle = 'MM.yyyy';

  /** Long date format */
  public readonly dateFormatLong = 'MMMM' + this.ui.nonBreakingSpace + 'yyyy';

  /** Link-to-this text. */
  public get linkToThisText() { return this.ui && this.ui['Link to this heading'] ? this.ui['Link to this heading'].text : ''; }

  /**
   * Constructs the Localization service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   */
  constructor(
    private portfolioModel: PortfolioModel,
  ) {
  }

  /** Default shorter date format */
  public dateFormatShorter(decorations: boolean) { return decorations ? this.dateFormatMiddle : this.dateFormatShort; }

  /** Default longer date format */
  public dateFormatLonger(decorations: boolean) { return decorations ? this.dateFormatLong : this.dateFormatMiddle; }

  /**
   * Localization safe text.
   *
   * @param key The localization text element key.
   *
   * @returns The internationalized text.
   */
  public localizationText(key: string): string {
    return decodeURI(this.ui[key]?.text ?? key);
  }
}

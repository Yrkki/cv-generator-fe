import { Injectable } from '@angular/core';

/**
 * A Localization service.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  /** Non-breaking space character. */
  public readonly nonBreakingSpace = '\u00A0'; // &nbsp;
  // public readonly nonBreakingSpace = '\u202F';

  /** Short date format. */
  public readonly dateFormatShort = 'yyyy';

  /** Middle date format. */
  public readonly dateFormatMiddle = 'MM.yyyy';

  /** Long date format. */
  public readonly dateFormatLong = 'MMMM' + this.nonBreakingSpace + 'yyyy';

  /**
   * Constructs the Localization service.
   * ~constructor
   *
   */
  constructor(
  ) {
  }

  /** Default shorter date format. */
  public dateFormatShorter(decorations: boolean) { return decorations ? this.dateFormatMiddle : this.dateFormatShort; }

  /** Default longer date format. */
  public dateFormatLonger(decorations: boolean) { return decorations ? this.dateFormatLong : this.dateFormatMiddle; }
}

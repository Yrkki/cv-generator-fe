// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { EventEmitter, Inject, Injectable, InjectionToken } from '@angular/core';

import { EntitiesModel } from '../../model/entities/entities.model';

import { ImageService } from '../../services/image/image.service';
import { LocalizationService } from '../../services/localization/localization.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

/* Location reload dependency injection token. */
export const locationReloadToken = new InjectionToken<typeof globalThis.location.reload>('locationReloadToken', {
  factory: () => globalThis.location.reload
});

/**
 * A UI service.
 */
@Injectable({
  providedIn: 'root'
})
export class UiService {
  /** UI invalidated event emitter. */
  public readonly uiInvalidated$ = new EventEmitter<boolean>();

  /** Tinted toggled event emitter. */
  public readonly tintedToggled$ = new EventEmitter<boolean>();

  /** UI data getter. */
  public get ui() { return this.entitiesModel.ui; }

  /** Main component name. Used for a base of the internal anchors. */
  public readonly componentName = '';

  /** Frequencies divider object. */
  public readonly frequenciesDivider = '•';

  /** Link-to-this symbol. */
  public readonly linkToThisSymbol = '◆'; // &#9670;, &diams; // text charachter, colorable
  // public readonly linkToThisSymbol = '♦'; // &#9830;, &diams; // red emoji, not colorable; others: &#11045; &#11049; &#11201;
  // public readonly linkToThisSymbol = '♢'; // &#9826;

  /** Non-breaking space character getter. */
  public get nonBreakingSpace() { return this.localizationService.nonBreakingSpace; }

  /** Link-to-this text. */
  public get linkToThisText() { return this.uiText('Link to this heading'); }

  /**
   * Constructs the UI service.
   * ~constructor
   *
   * @param imageService The image service injected dependency.
   * @param localizationService The localization service injected dependency.
   * @param entitiesModel The entities model injected dependency.
   * @param locationReloadToken The location reload token injected dependency.
   */
   constructor(
     public readonly imageService: ImageService,
     public readonly localizationService: LocalizationService,
     private readonly entitiesModel: EntitiesModel,
    @Inject(locationReloadToken) private locationReload: typeof globalThis.location.reload
  ) {
  }

  /** Reload window. */
  public windowReload() { this.locationReload(); }

  /**
   * Names a header aria-labelledby tab.
   *
   * @param key The type of tab.
   *
   * @returns The header aria-labelledby tab name.
   */
  public tabName(key: string): string {
    return StringExService.replaceAll([key, 'tab'].join(' '), ' ', '_');
  }

  /**
   * Names an aria-label link.
   *
   * @param key The type of link.
   *
   * @returns The aria-label link name.
   */
  public linkLabel(key: string | undefined): string {
    if (typeof key === 'undefined') { return ''; }
    return StringExService.replaceAll([key, 'link'].join(' '), ' ', '_');
  }

  /**
   * Calculates id of an element.
   *
   * @param key The type of id.
   *
   * @returns The id.
   */
  public id(key: string): string {
    return StringExService.replaceAll([key, 'id'].join(' '), ' ', '_');
  }

  /**
   * Labels an element.
   *
   * @param key The type of label.
   *
   * @returns The label name.
   */
  public label(key: string): string {
    return StringExService.replaceAll([key, 'label'].join(' '), ' ', '_');
  }

  /**
   * UI safe text. Defaults to placeholder.
   *
   * @param key The ui text element key.
   *
   * @returns The internationalized text.
   */
  public uiText(key: string): string {
    return decodeURI(this.ui[key]?.text ?? key);
  }

  /**
   * UI slow safe text. Defaults to blank and not placeholder.
   *
   * @param key The ui text element key.
   *
   * @returns The internationalized slow text.
   */
  public uiSlowText(key: string): string {
    return decodeURI(this.ui[key]?.text ?? '');
  }

  /**
   * Names a chart element.
   *
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  public chartName(key: string): string {
    return this.id(key + ' chart');
  }

  /**
   * Frequency style.
   *
   * @param frequency The frequency to style.
   * @param emphasis Whether to emphasize the style.
   *
   * @returns The frequency style.
   */
  public getFrequencyStyle(frequency: any[], emphasis: boolean) {
    const lightness = frequency[1].Lightness;

    const style = { color: 'hsl(120, 0%, ' + lightness + '%)' };
    if (emphasis) {
      return {
        ...style,
        'font-size': frequency[1].Size + 'px',
        'font-weight': frequency[1].Weight
      };
    } else {
      return style;
    }
  }
}

import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { DataService } from '../../services/data/data.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

/**
 * A UI service.
 */
@Injectable({
  providedIn: 'root'
})
export class UiService {
  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }
  /** UI data setter. */
  public set ui(value) { this.portfolioModel.ui = value; }

  /** Main component name. Used for a base of the internal anchors. */
  public readonly componentName = '';

  /** Frequencies divider object. */
  public readonly frequenciesDivider = '•';

  /** Link-to-this symbol. */
  public readonly linkToThisSymbol = '◆'; // &#9670;, &diams; // text charachter, colorable
  // public readonly linkToThisSymbol = '♦'; // &#9830;, &diams; // red emoji, not colorable; others: &#11045; &#11049; &#11201;
  // public readonly linkToThisSymbol = '♢'; // &#9826;

  /** Non-breaking space character */
  public readonly nonBreakingSpace = '\u00A0';
  // public readonly nonBreakingSpace = '\u202F';

  /** Short date format */
  public readonly dateFormatShort = 'yyyy';

  /** Middle date format */
  public readonly dateFormatMiddle = 'MM.yyyy';

  /** Long date format */
  public readonly dateFormatLong = 'MMMM' + this.nonBreakingSpace + 'yyyy';

  /** Link-to-this text. */
  public get linkToThisText() { return this.ui && this.ui['Link to this heading'] ? this.ui['Link to this heading'].text : ''; }

  /** Images data location. */
  private readonly images: string = this.dataService.urlResolve('/assets', 'images');
  /** Placeholder image name. */
  public readonly placeholderImageName = 'Empty.png';
  /** Placeholder image delegate. */
  public readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

  /** Data encrypted predicate property. */
  public get dataEncrypted(): boolean { return !this.ui || !this.ui.Search || this.ui.Search.text !== 'Search'; }

  /**
   * Constructs the UI service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private portfolioModel: PortfolioModel,
    private dataService: DataService  ) {
  }

  /** Default shorter date format */
  public dateFormatShorter(decorations: boolean) { return decorations ? this.dateFormatMiddle : this.dateFormatShort; }

  /** Default longer date format */
  public dateFormatLonger(decorations: boolean) { return decorations ? this.dateFormatLong : this.dateFormatMiddle; }

  /**
   * Names a header aria-labelledby tab.
   * @param key The type of tab.
   *
   * @returns The header aria-labelledby tab name.
   */
  public tabName(key: string): string {
    return this.replaceAll(key + ' tab', ' ', '_');
  }

  /**
   * Names an aria-label link.
   * @param key The type of link.
   *
   * @returns The aria-label link name.
   */
  public linkLabel(key: string | undefined): string {
    if ( key === undefined ) { return ''; }
    return this.replaceAll(key + ' link', ' ', '_');
  }

  /**
   * Labels an element.
   * @param key The type of label.
   *
   * @returns The label name.
   */
  public label(key: string): string {
    return this.replaceAll(key + ' label', ' ', '_');
  }

  /**
   * Gets a project image uri.
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The project image uri.
   */
  public getProjectProjectImageUri(imageName: string, full: boolean = false): string {
    return this.getSafeUri(this.dataService.imageDataService.getProjectProjectImageUri(imageName, full));
  }

  /**
   * Gets a background logo image uri.
   * @param imageName The image name.
   *
   * @returns The background logo image uri.
   */
  public getBackgroundLogoImageUri(imageName: string): string {
    return this.getSafeUri(this.dataService.imageDataService.getBackgroundLogoImageUri(imageName));
  }

  /**
   * Gets an asset image.
   * @param imageName The image name.
   *
   * @returns The asset image.
   */
  public getAssetUri(imageName: string): string {
    return this.getSafeUri(this.dataService.imageDataService.getAssetUri(imageName));
  }

  /**
   * Gets a safe uri.
   * @param url The url to process.
   *
   * @returns The safe uri.
   */
  public getSafeUri(url: string): string {
    return this.dataEncrypted ? this.placeholderImage : url;
  }

  /**
   * Is empty project image.
   * @param imageName The image name.
   *
   * @returns Whether the project image is empty.
   */
  public isEmptyProjectProjectImage(imageName: string): boolean {
    return imageName === this.placeholderImageName || this.getProjectProjectImageUri(imageName) === this.placeholderImage;
  }

  /** Replace all delegate. */
  public replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
}

import { Component, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { DataService } from '../../services/data/data.service';
import { Params } from '../../services/component-outlet-injector/params';
import { Indexable } from '../../interfaces/indexable';

/**
 * Property component
 */
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {
  /** Injector params propery name */
  #propertyName: Indexable = {};
  /** Injected params propery name getter. */
  public get propertyName(): Indexable { return this.#propertyName; }
  /** Injected params propery name setter. */
  @Input() public set propertyName(value: Indexable) { this.#propertyName = value; }

  /** Property name type getter. */
  protected get type(): string { return ''; }

  /** Default date format getter. */
  protected get defaultDateFormat() { return this.uiService.localizationService.dateFormatMiddle; }

  /** Date format getter. */
  public get dateFormat() {
    return this.portfolioService.persistenceService.getItem(this.dateFormatKey) ?? this.defaultDateFormat;
  }
  /** Date format setter. */
  public set dateFormat(value) {
    this.portfolioService.persistenceService.setItem(this.dateFormatKey, value.toString());
  }

  /** Property name type getter. */
  private get dateFormatKey() { return [this.type, 'date format'].join(' '); }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Detail bullet symbol. */
  public get detailBullet() { return this.uiService.frequenciesDivider; }

  /** Detail indent. */
  public get detailIndent() { return '    '; }

  /** Description formatter. */
  public get description(): string[] {
    const description = this.propertyName.Description;
    if (typeof description === typeof Array) {
      return description;
    } else {
      const descriptionString = description as string;
      return (descriptionString
        ? descriptionString.toString().split('\n')
        : [])
        .map((_) => _.replace(new RegExp('\\\\n', 'g'), '\n' + this.detailIndent));
    }
  }

  /**
   * Constructs the Property component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    if (params !== undefined) {
      this.propertyName = params.propertyName;
    }
  }

  /** Get background logoimage uri delegate. */
  getBackgroundLogoImageUri(imageName: string) {
    return this.uiService.imageService.getBackgroundLogoImageUri(imageName);
  }

  /** Get safe uri delegate. */
  getSafeUri(url: string) {
    return this.uiService.imageService.getSafeUri(url);
  }

  /** Get JS date value from Excel delegate. */
  getJsDateValueFromExcel(excelDate: any) {
    return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
  }

  /** Link label delegate. */
  linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
  }

  /** Rotate date format changer. */
  rotateDateFormat() {
    switch (this.dateFormat) {
      case this.uiService.localizationService.dateFormatShort: this.dateFormat = this.uiService.localizationService.dateFormatMiddle; break;
      case this.uiService.localizationService.dateFormatMiddle: this.dateFormat = this.uiService.localizationService.dateFormatLong; break;
      case this.uiService.localizationService.dateFormatLong: this.dateFormat = this.uiService.localizationService.dateFormatShort; break;
      default: this.dateFormat = this.defaultDateFormat;
    }
  }
}

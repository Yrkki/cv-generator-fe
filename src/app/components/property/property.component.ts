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
  protected get defaultDateFormat() { return this.uiService.dateFormatMiddle; }

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
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

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
        .map((_) => _.replace(/\\n/g, '\n' + this.detailIndent));
    }
  }

  /**
   * Constructs the Property component.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    if (params !== undefined) {
      this.propertyName = params.propertyName;
    }
  }

  /** Get background logoimage uri delegate. */
  getBackgroundLogoImageUri(imageName: string) {
    return this.uiService.getBackgroundLogoImageUri(imageName);
  }

  /** Data encrypted getter delegate. */
  private get dataEncrypted(): boolean {
    return this.uiService.dataEncrypted;
  }

  /** Get safe uri delegate. */
  getSafeUri(url: string) {
    return this.uiService.getSafeUri(url);
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
      case this.uiService.dateFormatShort: this.dateFormat = this.uiService.dateFormatMiddle; break;
      case this.uiService.dateFormatMiddle: this.dateFormat = this.uiService.dateFormatLong; break;
      case this.uiService.dateFormatLong: this.dateFormat = this.uiService.dateFormatShort; break;
      default: this.dateFormat = this.defaultDateFormat;
    }
  }
}

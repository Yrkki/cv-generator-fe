import { Component, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
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
  // tslint:disable-next-line: variable-name
  @Input() private _propertyName: Indexable = {};
  /** Injected params propery name getter. */
  public get propertyName(): Indexable { return this._propertyName; }
  /** Injected params propery name setter. */
  public set propertyName(value: Indexable) { this._propertyName = value; }

  /** Date format */
  public get dateFormat() { return this.uiService.dateFormatLonger(this.portfolioService.decorations); }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Detail bullet symbol. */
  public get detailBullet() { return this.uiService.frequenciesDivider; }

  /** Description formatter. */
  public get description(): string[] {
    if (typeof this.propertyName.Description === typeof Array) {
      return this.propertyName.Description;
    } else {
      return this.propertyName.Description ? this.propertyName.Description.toString().split('\n') : [];
    }
  }

  /**
   * Constructs the Property component.
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
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
}

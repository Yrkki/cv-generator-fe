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
  @Input() propertyName: Indexable = {};

  /** Date format */
  public get dateFormat() { return this.uiService.dateFormatLonger(this.portfolioService.decorations); }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /** Count cache delegate. */
  private get countCache() { return this.portfolioService.countCache; }

  /** Detail bullet symbol. */
  public get detailBullet() { return this.uiService.frequenciesDivider; }

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

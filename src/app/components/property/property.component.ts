import { Component, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';
import { Params } from '../../services/component-outlet-injector/params';

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
  @Input() propertyName: string;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Count cache delegate. */
  private get countCache() { return this.portfolioComponent.countCache; }

  /** Detail bullet symbol. */
  private get detailBullet() { return this.portfolioComponent.frequenciesDivider; }

  /**
   * Constructs the Property component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    public params?: Params) {
    if (params !== undefined) {
      this.propertyName = params.propertyName;
    }
  }

  /** Get background logoimage uri delegate. */
  getBackgroundLogoImageUri(imageName: string) {
    return this.portfolioComponent.getBackgroundLogoImageUri(imageName);
  }

  /** Data encrypted getter delegate. */
  private get dataEncrypted(): boolean {
    return this.portfolioComponent.dataEncrypted;
  }

  /** Get safe uri delegate. */
  getSafeUri(url: string) {
    return this.portfolioComponent.getSafeUri(url);
  }

  /** Get JS date value from Excel delegate. */
  getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }
}

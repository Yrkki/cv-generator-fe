import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';
import { Params } from '../../services/component-outlet-injector/params';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() propertyName: any;

  public get entities() { return this.portfolioComponent.entities; }
  public get ui() { return this.portfolioComponent.ui; }

  private get countCache() { return this.portfolioComponent.countCache; }

  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    public params?: Params) {
    if (params !== undefined) {
      this.propertyName = params.propertyName;
    }
  }

  ngOnInit() {
  }

  getBackgroundLogoImageUri(imageName: string) {
    return this.portfolioComponent.getBackgroundLogoImageUri(imageName);
  }

  private get dataEncrypted(): boolean {
    return this.portfolioComponent.dataEncrypted;
  }

  getSafeUri(url: string) {
    return this.portfolioComponent.getSafeUri(url);
  }

  getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }
}

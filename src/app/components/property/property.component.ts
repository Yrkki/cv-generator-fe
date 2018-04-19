import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() propertyName: any;

  private get entities() { return this.portfolioComponent.entities; }
  public get ui() { return this.portfolioComponent.ui; }

  private get countCache() { return this.portfolioComponent.countCache; }

  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService) {
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

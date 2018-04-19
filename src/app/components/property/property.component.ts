import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() propertyName: any;

  private entities: any;
  public ui: any;

  private readonly images: string = this.dataService.urlResolve('/assets', 'images');
  private readonly placeholderImageName = 'Empty.png';
  private readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    private excelDateFormatterService: ExcelDateFormatterService) {
    this.entities = portfolioComponent.entities;
    this.ui = portfolioComponent.ui;
  }

  ngOnInit() {
  }

  getBackgroundLogoImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getBackgroundLogoImageUri(imageName));
  }

  private get dataEncrypted(): boolean {
    return !this.entities || this.entities.Education.node !== 'Education';
  }

  getSafeUri(url: string) {
    return this.dataEncrypted ? this.placeholderImage : url;
  }

  getJsDateValueFromExcel(excelDate: any) {
    let date = new Date(2000, 0, 1);

    if (typeof excelDate === 'string') {
      const timestamp = Date.parse(excelDate);

      if (!isNaN(timestamp)) {
        date = new Date(timestamp);
      }
    } else if (typeof excelDate === 'number') {
      date = new Date(this.excelDateFormatterService.getJsDateValueFromExcel(excelDate));
    }

    return date;
  }
}

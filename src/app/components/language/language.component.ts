import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ChartService } from '../../services/chart/chart.service';
import { DataService } from 'src/app/services/data/data.service';

/**
 * Language component.
 * ~extends {@link PropertyComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends PropertyComponent implements AfterViewInit {
  /**
   * Constructs a Language component.
   * ~constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    private chartService: ChartService) {
    super(portfolioComponent, dataService);
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.drawLanguageChart();
  }

  /** Draws a language chart */
  private drawLanguageChart() {
    if (typeof this.portfolioComponent.cv !== 'undefined' && this.portfolioComponent.cv != null) {
      const chartType = 'Language';
      const data = this.portfolioComponent.cv.Languages;

      this.portfolioComponent.drawChart(chartType, this.chartService.addLanguageChart(data));
    }
  }
}

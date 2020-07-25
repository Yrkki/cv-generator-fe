import { Component, AfterViewInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';
import { ChartService } from '../../services/chart/chart.service';

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
   * @param chartService The chart service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    private chartService: ChartService,
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    super(portfolioService, uiService, dataService, excelDateFormatterService, params);
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
    if (typeof this.portfolioService.cv !== 'undefined' && this.portfolioService.cv != null) {
      const chartType = 'Language';
      const data = this.portfolioService.cv.Languages;

      this.chartService.drawChart(chartType, this.chartService.addLanguageChart(data));
    }
  }
}

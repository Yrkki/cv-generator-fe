import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ChartService } from '../../services/chart/chart.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit, AfterViewInit {
  // @Input() private headerLink: TemplateRef<any>;

  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  public tagCloudDisplayMode;

  constructor(
    public portfolioComponent: PortfolioComponent,
    private chartService: ChartService) {
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));
    this.tagCloudDisplayMode = portfolioComponent.tagCloudDisplayMode;
    // this.headerLink = this.portfolioComponent.headerLink;
  }

  get tagCloud() {
    return this.portfolioComponent.tagCloud;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.restoreToggle(document, 'Project Summary', 'ProjectSummaryContent');
    ['Areas of Expertise', 'Skills', 'Job Functions'].forEach(_ => this.restoreToggle(document, _));

    this.drawFrequenciesChart();
  }

  private onSearchTokenChanged(value: string) {
    this.drawFrequenciesChart();
  }

  private drawFrequenciesChart() {
    if (typeof this.portfolioComponent.cv !== 'undefined' && this.portfolioComponent.cv != null) {
      for (const chartType in this.entities) {
        if (this.entities.hasOwnProperty(chartType)) {
          const data = this.portfolioComponent.getFrequenciesCache(chartType);
          if (data != null) {
            this.portfolioComponent.drawChart(chartType, this.chartService.addChart(data));
          }
        }
      }
    }
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }

  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }
}

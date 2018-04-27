import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit, AfterViewInit {
  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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
            this.portfolioComponent.drawFrequenciesChart(chartType, data);
          }
        }
      }
    }
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }
}

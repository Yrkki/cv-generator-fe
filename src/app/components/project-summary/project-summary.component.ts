import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  ngOnInit() {
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }
}

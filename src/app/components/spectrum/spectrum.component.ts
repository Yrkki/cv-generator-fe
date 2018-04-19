import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent implements OnInit {
  private readonly frequenciesDivider;

  @Input() key: any;

  public entities: any;
  public ui: any;

  private countCache;

  public tagCloudDisplayMode;

  get tagCloud() {
    return this.portfolioComponent.tagCloud;
  }
  @Input() set tagCloud(value) {
    this.portfolioComponent.tagCloud = value;
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.entities = portfolioComponent.entities;
    this.ui = portfolioComponent.ui;
    this.countCache = portfolioComponent.countCache;
    this.tagCloudDisplayMode = portfolioComponent.tagCloudDisplayMode;
  }

  ngOnInit() {
  }

  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }
}

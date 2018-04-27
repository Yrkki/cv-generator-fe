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

  public get entities() { return this.portfolioComponent.entities; }
  public get ui() { return this.portfolioComponent.ui; }

  public tagCloudDisplayMode;

  get tagCloud() {
    return this.portfolioComponent.tagCloud;
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
    this.tagCloudDisplayMode = portfolioComponent.tagCloudDisplayMode;
  }

  ngOnInit() {
  }

  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }
}

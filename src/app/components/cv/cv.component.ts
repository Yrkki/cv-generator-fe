import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  private readonly frequenciesDivider;

  public get cv() { return this.portfolioComponent.cv; }
  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
  }

  ngOnInit() {
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }
}

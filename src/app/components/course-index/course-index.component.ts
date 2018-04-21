import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  @Input() i: number;

  private readonly frequenciesDivider;

  constructor(
    public portfolioComponent: PortfolioComponent) {
    super(portfolioComponent, null);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }
}

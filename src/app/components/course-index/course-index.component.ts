import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  @Input() i: number;

  private readonly frequenciesDivider;

  constructor(
    public portfolioComponent: PortfolioComponent,
    public params?: Params) {
    super(portfolioComponent, null, params);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
}

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
}

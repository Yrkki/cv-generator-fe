import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.scss']
})
export class ProjectIndexComponent extends PropertyComponent {
  @Input() i: number;

  private readonly frequenciesDivider;

  public readonly componentName;

  constructor(
    public portfolioComponent: PortfolioComponent) {
    super(portfolioComponent, null);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.componentName = portfolioComponent.componentName;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';

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
    public portfolioComponent: PortfolioComponent,
    public params?: Params) {
    super(portfolioComponent, null, params);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.componentName = portfolioComponent.componentName;
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }
}

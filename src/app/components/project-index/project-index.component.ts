import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Project index component
 */
@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.scss']
})
export class ProjectIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i: number;

  /** Frequencies divider object delegate. */
  private get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Main component name delegate. */
  public readonly componentName;

  /**
   * Constructs the Project index component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public params?: Params) {
    super(portfolioComponent, null, params);
    this.componentName = portfolioComponent.componentName;
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';
import { DataService } from 'src/app/services/data/data.service';

/**
 * Project index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.scss']
})
export class ProjectIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Main component name delegate. */
  public get componentName() { return this.portfolioComponent.componentName; }

  /**
   * Constructs the Project index component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    public params?: Params) {
    super(portfolioComponent, dataService, params);
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }
}

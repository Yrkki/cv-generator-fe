import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';
import { DataService } from 'src/app/services/data/data.service';

/**
 * Course index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** The key. */
  get key() { return 'Name'; }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(newValue: string) { this.portfolioComponent.updateSearchToken(newValue); }

  /**
   * Constructs the Course index component.
   * @param portfolioComponent The common portfolio component injected dependency.
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

  /** Search token getter delegate. */
  get SearchToken(): string {
    return this.portfolioComponent.SearchToken;
  }
  /** Search token setter delegate. */
  @Input() set SearchToken(value: string) {
    this.portfolioComponent.SearchToken = value;
  }

  /** Match frequency for the template to the precalculated cache. */
  get frequency() {
    let frequency;

    try {
      frequency = this.getFrequenciesCache(this.key).find(_ => _[0] === this.propertyName[this.key]);
    } catch (ex) {
      frequency = [
        this.propertyName[this.key],
        {
          'Count': 1,
          'Percentage': 100,
          'Lightness': 0,
          get Label() { return ''; }
        }
      ];
    }

    return frequency;
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioComponent.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
 }
}

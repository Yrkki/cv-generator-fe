import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Params } from '../../services/component-outlet-injector/params';
import { DataService } from 'src/app/services/data/data.service';

/**
 * Publication index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-publication-index',
  templateUrl: './publication-index.component.html',
  styleUrls: ['./publication-index.component.scss']
})
export class PublicationIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(newValue: string) { this.portfolioComponent.updateSearchToken(newValue); }

  /**
   * Constructs the Publication component.
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

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
 }
}

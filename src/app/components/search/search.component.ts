import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() position: any;

  public get ui() { return this.portfolioComponent.ui; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  ngOnInit() {
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }
}

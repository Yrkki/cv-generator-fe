import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() position: any;

  public get ui() { return this.portfolioComponent.ui; }


  searchTokenChanged: Subject<string> = new Subject<string>();

  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.searchTokenChanged
      .debounceTime(800) // wait a bit after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(_ => { this.searchToken = _; });
  }

  ngOnInit() {
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  onFieldChange(query: string) {
    this.searchTokenChanged.next(query);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() position: any;

  public entities: any;

  constructor(
    public portfolioComponent: PortfolioComponent) {
    this.entities = portfolioComponent.entities;
  }

  ngOnInit() {
  }

  private tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  private nonBreaking(sectionName: string) {
    return this.portfolioComponent.nonBreaking(sectionName);
  }

  private decorateMain(key: string) {
    return this.entities[key] && this.entities[key].main
      ? this.entities[key].section
        ? this.entities[key].section.toUpperCase()
        : ''
      : this.entities[key].section
        ? this.entities[key].section
        : '';
  }
}

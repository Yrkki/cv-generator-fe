import { Component, OnInit } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';

/**
 * Footer component.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  /** The app version string. */
  public version = '';

  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /**
   * Constructs the Footer component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService
  ) { }

  /** Initialization */
  ngOnInit() {
    this.getVersion();
  }

  /** Loads the Version. */
  private getVersion(): void {
    this.dataService.getVersion().subscribe((version) => {
      if (this.isEmpty(version)) { return; }
      try {
        this.version = version.builds[0].version;
      } catch (error) { }
    });
  }

  /** Whether an object is empty delegate. */
  isEmpty(obj: object): boolean {
    return this.portfolioComponent.isEmpty(obj);
  }

  /** Get an asset image delegate. */
  getAssetUri(imageName: string): string {
    return this.portfolioComponent.getAssetUri(imageName);
  }

  /** Link label delegate. */
  linkLabel(key: string): string {
    return this.portfolioComponent.linkLabel(key);
  }
}

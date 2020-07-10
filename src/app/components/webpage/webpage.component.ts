import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Title } from '@angular/platform-browser';

/**
 * Personal webpage component
 * ~implements {@link OnInit}
 */
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {
  /** Name. */
  public readonly name = 'Georgi Marinov';

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /**
   * Constructs the personal webpage component.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param titleService The title service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private titleService: Title) {
    this.setTitle(this.name);
  }

  /** Initialization */
  ngOnInit() {
  }

  /**
   * Sets a new page title.
   * @param newTitle The new page title to set.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
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
  public get decorations() { return this.portfolioService.decorations; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

  /**
   * Constructs the personal webpage component.
   * @param portfolioService The portfolio service injected dependency.
   * @param titleService The title service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private titleService: Title) {
    this.setTitle(this.name);
  }

  /** Initialization */
  ngOnInit() {
    this.portfolioService.LoadData();
  }

  /**
   * Sets a new page title.
   * @param newTitle The new page title to set.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}

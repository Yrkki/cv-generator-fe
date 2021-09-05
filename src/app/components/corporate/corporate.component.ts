import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { UiService } from '../../services/ui/ui.service';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';
import { Title } from '@angular/platform-browser';

/**
 * Personal corporate component
 * ~implements {@link OnInit}
 */
@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  /** Name. */
  public get name() { return this.uiService.uiText('Corporate Company name'); }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /**
   * Constructs the personal corporate component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataLoaderService The data loader service injected dependency.
   * @param titleService The title service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly uiService: UiService,
    private readonly dataLoaderService: DataLoaderService,
    private readonly titleService: Title) {
  }

  /** Initialization */
  ngOnInit() {
    this.dataLoaderService.LoadData();
    this.setTitle(this.name);
  }

  /**
   * Sets a new page title.
   *
   * @param newTitle The new page title to set.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}

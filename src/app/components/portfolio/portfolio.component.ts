import {
  Component, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy,
  // ChangeDetectorRef
} from '@angular/core';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DocumentService } from '../../services/document/document.service';
import { DataService } from '../../services/data/data.service';
import { MockDataService } from '../../services/mock-data/mock-data.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';
import { HeaderComponent } from '../header/header.component';

/**
 * Portfolio component
 * ~implements {@link AfterViewInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Go to top clickable element. */
  @ViewChild('clickableGoToTop') clickableGoToTop?: ElementRef<HTMLButtonElement>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /**
   * Constructs the Portfolio component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param documentService The document service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly accomplishmentsService: AccomplishmentsService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly documentService: DocumentService,
    private dataService: DataService,
    // private readonly route: ActivatedRoute,
    // private readonly router: Router,
    // private readonly ref: ChangeDetectorRef
  ) {
    // console.log('Debug: PortfolioComponent: constructor: constructing...');
  }

  /**
   * Initialization
   * @param mockDataService The mock data service for testing.
   */
  ngAfterViewInit(mockDataService?: MockDataService) {
    this.LoadData(mockDataService);
    this.subscribeUiInvalidated();
  }

  /** Cleanup */
  ngOnDestroy() {
    this.unsubscribeUiInvalidated();
  }

  /** Subscribe events */
  private subscribeUiInvalidated() {
    this.uiService.uiInvalidated$.subscribe((uiInvalidated$) => {
      if (uiInvalidated$) {
        this.refreshUI();
      }
    });
  }

  /** Unsubscribe events */
  private unsubscribeUiInvalidated() {
    if (this.uiService.uiInvalidated$) {
      this.uiService.uiInvalidated$.unsubscribe();
    }
  }

  /** Refresh UI */
  private refreshUI() {
    // setInterval(() => {
    //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //   this.router.navigated = false;
    // });

    // setInterval(() => {
    //   console.log(`refresh: refreshing...`);
    //   this.ref.detach();
    //   this.ref.markForCheck();
    //   this.ref.reattach();
    this.windowReload();
    //   this.uiService.uiInvalidated$.unsubscribe();
    // });
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }

  /**
   * Load data
   * @param mockDataService The mock data service for testing.
   */
  public LoadData(mockDataService?: MockDataService) {
    if (mockDataService) { this.dataService = mockDataService; }

    this.portfolioService.LoadData();

    // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline']
    //   .forEach(_ => this.persistenceService.restoreToggle(document, _));

    globalThis.onscroll = (_) => this.documentService.scrollFunction();
  }
}

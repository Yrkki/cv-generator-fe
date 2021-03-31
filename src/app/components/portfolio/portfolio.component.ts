import {
  Component, AfterViewInit, ViewChild, ElementRef, TemplateRef, ViewChildren, QueryList, OnDestroy,
  // ChangeDetectorRef
} from '@angular/core';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DocumentService } from '../../services/document/document.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { ThemeChangerService } from '../../services/theme-changer/theme-changer.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';
import { ToggleComponent } from '../toggle/toggle.component';

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
  /** Header link default template reference. */
  @ViewChild('defaultHeaderLink') defaultHeaderLink?: TemplateRef<any>;

  /** Section counter default template reference. */
  @ViewChild('defaultSectionCounter') defaultSectionCounter?: TemplateRef<any>;

  /** Columns toggles template reference getter. */
  public get columnsToggles(): TemplateRef<any> | undefined { return this.portfolioService.columnsToggles; }
  /** Columns toggles template reference setter. */
  @ViewChild('columnsToggles') public set columnsToggles(value: TemplateRef<any> | undefined) {
    this.portfolioService.columnsToggles = value;
  }

  /** Toggle component. */
  @ViewChildren(ToggleComponent) toggleComponents?: QueryList<ToggleComponent>;

  /** The tag cloud element. */
  @ViewChild('tagCloudElement') tagCloudElement?: ElementRef;

  /** The chart tag cloud element. */
  @ViewChild('chartElement') chartElement?: ElementRef;

  /** The both tag cloud element. */
  @ViewChild('bothElement') bothElement?: ElementRef;

  /** Curriculum Vitae clickable element. */
  @ViewChild('clickableCurriculumVitae') clickableCurriculumVitae?: ElementRef;

  /** Clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Gantt chart map clickable element. */
  @ViewChild('clickableGanttChartMap') clickableGanttChartMap?: ElementRef;

  /** Project summary clickable element. */
  @ViewChild('clickableProjectSummary') clickableProjectSummary?: ElementRef;

  /** Mode decorated clickable element. */
  @ViewChild('clickableModeDecorated') clickableModeDecorated?: ElementRef;

  /** Mode clickable element. */
  @ViewChild('clickableMode') clickableMode?: ElementRef;

  /** Tag cloud clickable element. */
  @ViewChild('clickableTagCloud') clickableTagCloud?: ElementRef;

  /** Chart clickable element. */
  @ViewChild('clickableChart') clickableChart?: ElementRef;

  /** Both clickable element. */
  @ViewChild('clickableBoth') clickableBoth?: ElementRef;

  /** Project portfolio clickable element. */
  @ViewChild('clickableProjectPortfolio') clickableProjectPortfolio?: ElementRef;

  /** Go to top clickable element. */
  @ViewChild('clickableGoToTop') clickableGoToTop?: ElementRef;

  /** The projects accomplishment target element. */
  @ViewChild('projectsAccomplishment') projectsAccomplishment?: ElementRef;

  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /** Truncator kind enum accessor. */
  public get TruncatorKind() { return TruncatorKind; }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /**
   * Constructs the Portfolio component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param documentService The document service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param themeChangerService The theme changer service dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly accomplishmentsService: AccomplishmentsService,
    public readonly entitiesService: EntitiesService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly documentService: DocumentService,
    public readonly persistenceService: PersistenceService,
    private dataService: DataService,
    public readonly themeChangerService: ThemeChangerService,
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

  /** Replace all delegate. */
  public replaceAll(str: string | undefined, search: string | RegExp, replacement: any): string {
    if (!str) { return ''; }
    return StringExService.replaceAll(str, search, replacement);
  }
}

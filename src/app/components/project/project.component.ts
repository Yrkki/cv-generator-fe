import {
  Component, Injector, OnInit, OnDestroy, AfterViewInit,
  Input, TemplateRef, HostListener, ViewChild, ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { SorterKind } from '../../enums/sorter-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ProjectIndexComponent } from '../project-index/project-index.component';
import { ProjectContributionsComponent } from '../project-contributions/project-contributions.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

import { DataService } from '../../services/data/data.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

import { MockDataService } from '../../services/mock-data/mock-data.service';

import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';
import { Indexable } from '../../interfaces/indexable';
import { ChartService } from '../../services/chart/chart.service';

/**
 * Project component
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** Gantt hart clickable element. */
  @ViewChild('clickableGanttChart') clickableGanttChart?: ElementRef;

  /** Contributions clickable element. */
  @ViewChild('clickableContributions') clickableContributions?: ElementRef;

  /** List clickable element. */
  @ViewChild('clickableList') clickableList?: ElementRef;

  /** Index clickable element. */
  @ViewChild('clickableIndex') clickableIndex?: ElementRef;

  /** Projects clickable element. */
  @ViewChild('clickableProjects') clickableProjects?: ElementRef;

  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** SorterKind enum template accessor getter. */
  public get SorterKind() { return SorterKind; }

  /** Project index component ComponentOutlet hook. */
  public ProjectIndexComponent = ProjectIndexComponent;
  /** Project contributions component ComponentOutlet hook. */
  public ProjectContributionsComponent = ProjectContributionsComponent;
  /** Project list component ComponentOutlet hook. */
  public ProjectListComponent = ProjectListComponent;
  /** Project card component ComponentOutlet hook. */
  public ProjectCardComponent = ProjectCardComponent;

  /** The gantt chart data */
  private ganttChart = new Array<GanttChartEntry>();

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs the Project component.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param ganttChartService The gantt chart service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    public chartService: ChartService,
    public inputService: InputService,
    public uiService: UiService,
    public persistenceService: PersistenceService,
    public dataService: DataService,
    public ganttChartService: GanttChartService,
    public injector: Injector,
    public componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.portfolioService.searchTokenChanged$.subscribe((_: string) => this.onSearchTokenChanged(_));
  }

  /** Cleanup */
  ngOnDestroy() {
    this.searchTokenSubscription?.unsubscribe();
  }

  /**
   * Load data
   * @param mockDataService The mock data service for testing.
   */
  ngAfterViewInit(mockDataService?: MockDataService) {
    this.LoadData();
  }

  /**
   * Load data
   * @param mockDataService The mock data service for testing.
   */
  LoadData(mockDataService?: MockDataService) {
    if (mockDataService) { this.dataService = mockDataService; }

    ['Project Portfolio'].forEach(_ => this.persistenceService.restoreToggle(document, _));
    ['Gantt Chart', 'Gantt Chart Map', 'Contributions', 'List', 'Index', 'Projects']
      .forEach(_ => this.persistenceService.restoreToggle(document, _));

    this.getGanttChart();
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawProjectGanttChart();
  }

  /** The resize event handler */
  private resize() {
    this.ganttChartService.resize(this.canvas);
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /** Draws the gantt chart. */
  private drawProjectGanttChart() {
    const chartType = 'Project Gantt';
    const data = this.ganttChart;

    this.chartService.drawChart(chartType, this.ganttChartService.addChart(data, this.portfolioService.filtered.Projects));
    this.chartService.drawChart(chartType + ' Map', this.ganttChartService.addChart(data, this.portfolioService.filtered.Projects));
  }

  /** Loads the gantt chart. */
  private getGanttChart(): void {
    this.dataService.getGanttChart().pipe(take(1)).subscribe((ganttChart) => {
      this.ganttChart = ganttChart;
      this.drawProjectGanttChart();
    });
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Remaining collection. */
  public remaining(collection: any[]): any[] {
    return this.portfolioService.remaining(collection, undefined, this.portfolioService.entities['Project Portfolio']?.key);
  }
}

import { Component, Injector, AfterViewInit, Input, TemplateRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ProjectIndexComponent } from '../project-index/project-index.component';
import { ProjectContributionsComponent } from '../project-contributions/project-contributions.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

import { StringExService } from '../../services/string-ex/string-ex.service';
import { DataService } from '../../services/data/data.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

import { MockDataService } from '../../services/mock-data/mock-data.service';

import { GanttChartEntry } from '../../classes/gantt-chart-entry/gantt-chart-entry';
import { Indexable } from '../../interfaces/indexable';
import { Project } from '../../interfaces/project/project';
import { ChartService } from '../../services/chart/chart.service';

/**
 * Project component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {
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

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioService.countCache; }

  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioService.filteredProjects; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

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
    private portfolioService: PortfolioService,
    private chartService: ChartService,
    private inputService: InputService,
    private uiService: UiService,
    private persistenceService: PersistenceService,
    private dataService: DataService,
    private ganttChartService: GanttChartService,
    private injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
    portfolioService.searchTokenChanged$.pipe(take(1)).subscribe(_ => this.onSearchTokenChanged(_));
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

    this.chartService.drawChart(chartType, this.ganttChartService.addChart(data, this.filteredProjects));
    this.chartService.drawChart(chartType + ' Map', this.ganttChartService.addChart(data, this.filteredProjects));
  }

  /** Loads the gantt chart. */
  private getGanttChart(): void {
    this.dataService.getGanttChart().pipe(take(1)).subscribe((ganttChart) => {
      this.ganttChart = ganttChart;
      this.drawProjectGanttChart();
    });
  }

  /** Project starts new period indicator delegate. */
  public getProjectStartsNewPeriod(project: any): boolean {
    return this.portfolioService.getProjectStartsNewPeriod(project);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Get decrypted project period delegate. */
  public getDecryptedProjectPeriod(project: any): string {
    return this.portfolioService.getDecryptedProjectPeriod(project);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.persistenceService.restoreToggle(document, typeName);
  }

  /** To title case delegate. */
  public toTitleCase(str: string | undefined) { return StringExService.toTitleCase(str); }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

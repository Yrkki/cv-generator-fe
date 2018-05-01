import { Component, OnInit, Injector, ReflectiveInjector, AfterViewInit } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { ProjectIndexComponent } from '../project-index/project-index.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

import { StringExService } from '../../services/string-ex/string-ex.service';
import { DataService } from '../../services/data/data.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  private readonly frequenciesDivider;

  private readonly componentName;

  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  private ProjectIndexComponent = ProjectIndexComponent;
  private ProjectListComponent = ProjectListComponent;
  private ProjectCardComponent = ProjectCardComponent;

  private ganttChart: any;

  private injectorCache = {};
  getInjector(propertyName, i?): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService,
    private ganttChartService: GanttChartService,
    public injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.componentName = portfolioComponent.componentName;
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.restoreToggle(document, 'Project Portfolio', 'ProjectPortfolioContent');
    this.restoreToggle(document, 'Gantt Chart', 'GanttChartContent');
    this.restoreToggle(document, 'List', 'ListContent');
    this.restoreToggle(document, 'Index', 'IndexContent');
    this.restoreToggle(document, 'Projects', 'ProjectsContent');

    this.getGanttChartReversed();
  }

  private onSearchTokenChanged(value: string) {
    this.drawProjectGanttChart();
  }

  private drawProjectGanttChart() {
    const chartType = 'Project Gantt';
    const data = this.ganttChart;
    if (data != null) {
      this.portfolioComponent.drawChart(chartType, this.ganttChartService.addChart(data, this.filteredProjects));
    }
  }

  private getGanttChartReversed(): void {
    this.dataService.getGanttChart().subscribe((ganttChart) => {
      this.ganttChart = ganttChart;
      this.drawProjectGanttChart();
    });
  }

  private getProjectLogoUri(imageName: string) {
    return this.portfolioComponent.getSafeUri(this.dataService.getProjectLogoUri(imageName));
  }

  private getProjectProjectImageUri(imageName: string) {
    return this.portfolioComponent.getProjectProjectImageUri(imageName);
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  private isEmptyProjectProjectImage(imageName: string): boolean {
    return this.portfolioComponent.isEmptyProjectProjectImage(imageName);
  }

  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }

  private getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }

  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }

  public toTitleCase(str) { return StringExService.toTitleCase(str); }
}

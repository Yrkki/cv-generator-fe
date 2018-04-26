import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { Params } from '../../classes/params';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { ProjectIndexComponent } from '../project-index/project-index.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

import { StringExService } from '../../services/string-ex/string-ex.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  private readonly frequenciesDivider;

  private readonly componentName;

  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  private ProjectIndexComponent = ProjectIndexComponent;
  private ProjectCardComponent = ProjectCardComponent;

  getInjector(propertyName, i?): Injector {
    const _myInjector = ReflectiveInjector.resolveAndCreate([Params], this.injector);
    const params: any = _myInjector.get(Params);
    params.propertyName = propertyName;
    if (i !== undefined) {
      params.i = i;
    }
    return _myInjector;
  }

  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService,
    public injector: Injector) {
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
    this.componentName = portfolioComponent.componentName;
  }

  ngOnInit() {
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

  public toTitleCase(str) { return StringExService.toTitleCase(str); }
}

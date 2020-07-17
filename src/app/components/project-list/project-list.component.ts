import { Component } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { StringExService } from '../../services/string-ex/string-ex.service';

/**
 * Project list component
 */
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatMiddle; }

  /** Main component name delegate. */
  public get componentName() { return this.portfolioComponent.componentName; }

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  /**
   * Constructs the Project component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  /** One person team project indicator delegate. */
  public getProjectIsOnePersonTeam(project: any): boolean {
    return this.portfolioComponent.getProjectIsOnePersonTeam(project);
  }

  /** Get decrypted project period delegate. */
  public getDecryptedProjectPeriod(project: any): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }

  /** Get JS date value from Excel delegate. */
  public getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }

  /** To title case delegate. */
  public toTitleCase(str: string | undefined) { return StringExService.toTitleCase(str); }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }
}

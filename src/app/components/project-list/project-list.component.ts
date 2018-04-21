import { Component, OnInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { StringExService } from '../../services/string-ex/string-ex.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public get entities() { return this.portfolioComponent.entities; }

  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  ngOnInit() {
  }

  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }

  private getJsDateValueFromExcel(excelDate: any) {
    return this.portfolioComponent.getJsDateValueFromExcel(excelDate);
  }

  public toTitleCase(str) { return StringExService.toTitleCase(str); }
}

import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent extends PropertyComponent {
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  public get projectProjectLinkUri() {
    if (this.propertyName['Links']) {
      return this.propertyName['Links'];
    } else {
      return this.getProjectProjectImageUri(this.propertyName['Photos'], true);
    }
  }

  public getProjectLogoUri(imageName: string) {
    return this.portfolioComponent.getSafeUri(this.dataService.getProjectLogoUri(imageName));
  }

  private getProjectProjectImageUri(imageName: string, full: boolean = false) {
    return this.portfolioComponent.getProjectProjectImageUri(imageName, full);
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  public isEmptyProjectProjectImage(imageName: string): boolean {
    return this.portfolioComponent.isEmptyProjectProjectImage(imageName);
  }

  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }
}

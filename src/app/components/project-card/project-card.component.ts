import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Project card component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent extends PropertyComponent {
  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatLong; }

  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  /** Project link uri delegate. */
  public get projectProjectLinkUri() {
    const links = 'Links';
    const photos = 'Photos';
    if (this.propertyName[links]) {
      return this.propertyName[links];
    } else {
      return this.getProjectProjectImageUri(this.propertyName[photos], true);
    }
  }

  /** Get project logo uri delegate. */
  public getProjectLogoUri(imageName: string) {
    return this.portfolioComponent.getSafeUri(this.dataService.getProjectLogoUri(imageName));
  }

  /** Get project image uri delegate. */
  private getProjectProjectImageUri(imageName: string, full: boolean = false) {
    return this.portfolioComponent.getProjectProjectImageUri(imageName, full);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Is empty project image delegate. */
  public isEmptyProjectProjectImage(imageName: string): boolean {
    return this.portfolioComponent.isEmptyProjectProjectImage(imageName);
  }

  /** Get decrypted project period delegate. */
  private getDecryptedProjectPeriod(project): string {
    return this.portfolioComponent.getDecryptedProjectPeriod(project);
  }
}

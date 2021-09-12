// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Project } from '../../interfaces/project/project';
import { StringExService } from '../../services/string-ex/string-ex.service';

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
  public get dateFormat() { return this.uiService.localizationService.dateFormatLong; }

  /** Project link uri. */
  public get projectProjectLinkUri() {
    const links = 'Links';
    const photos = 'Photos';
    const project: Project = this.propertyName as Project;

    if (project[links]) {
      return project[links];
    } else {
      return this.getProjectProjectImageUri(project[photos], true);
    }
  }

  /** Ides and tools. */
  public get idesAndTools() {
    const idesAndTools = this.entities['IDEs and Tools']?.node ?? 'IDEs and Tools';
    return this.replaceAll(idesAndTools, 'Tools', 'tools');
  }

  /** Get project logo uri delegate. */
  public getProjectLogoUri(imageName: string) {
    return this.uiService.imageService.getSafeUri(this.dataService.imageDataService.getProjectLogoUri(imageName));
  }

  /** Get project image uri delegate. */
  public getProjectProjectImageUri(imageName: string, full: boolean = false) {
    return this.uiService.imageService.getProjectProjectImageUri(imageName, full);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Is empty project image delegate. */
  public isEmptyProjectProjectImage(imageName: string): boolean {
    return this.uiService.imageService.isEmptyProjectProjectImage(imageName);
  }

  /** Get decrypted project period delegate. */
  public getDecryptedProjectPeriod(project: Project): string {
    return this.portfolioService.getDecryptedProjectPeriod(project);
  }

  /** Replace all delegate. */
  public replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
}

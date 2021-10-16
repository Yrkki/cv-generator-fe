// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { DataService } from '../../services/data/data.service';
import { EntitiesAdjusterService } from '../entities-adjuster/entities-adjuster.service';
import { ChartService } from '../../services/chart/chart.service';
import { CountCacheService } from '../count-cache/count-cache.service';

import { Course } from '../../interfaces/cv/course';
import { GeneralTimelineEntry } from '../../interfaces/general-timeline-entry/general-timeline-entry';
import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';

/**
 * A data-loader service.
 */
@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  /**
   * Constructs the data loader service.
   * ~constructor
   *
   * @param dataService The data service injected dependency.
   * @param entitiesAdjusterService The entities adjuster service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private readonly dataService: DataService,
    private readonly entitiesAdjusterService: EntitiesAdjusterService,
    private readonly chartService: ChartService,
    private readonly countCacheService: CountCacheService,
    private readonly portfolioModel: PortfolioModel,
    private readonly excelDateFormatterService: ExcelDateFormatterService,
    ) {
  }

  /**
   * Load data
   */
  public LoadData() {
    setTimeout(() => {
      this.getUi();
      this.getEntities();

      this.getCv();
      this.getProfessionalExperience();
      this.getEducation();
      this.getAccomplishments();
      this.getPublications();

      this.getProjects();

      this.getGeneralTimeline();

      this.chartService.initColors();
    });
  }

  /** Loads the CV. */
  private getCv(): void {
    this.dataService.getCv().pipe(take(1)).subscribe((cv) => {
      if (this.isEmpty(cv)) { return; }
      this.portfolioModel.cv = cv;
      this.portfolioModel.filtered.Languages = cv.Languages;

      // prefilter accessible personal data
      this.portfolioModel.cv['Personal data'] =
        this.portfolioModel.cv['Personal data'].filter((_) => _['Personal data'] && !['true', 'TRUE'].includes(_.Hidden));

      this.calcCountCache(['Language', 'Accomplishment']);
    });
  }

  /** Loads the professional experience. */
  private getProfessionalExperience(): void {
    this.dataService.getProfessionalExperience().pipe(take(1)).subscribe((experience) => {
      if (this.isEmpty(experience)) { return; }
      // this.experience = experience;
      this.portfolioModel.cv['Professional experience'] = experience;
      this.portfolioModel.filtered.ProfessionalExperience = experience;
    });
  }

  /** Loads the education. */
  private getEducation(): void {
    this.dataService.getEducation().pipe(take(1)).subscribe((education) => {
      if (this.isEmpty(education)) { return; }
      // this.education = education;
      this.portfolioModel.cv.Education = education;
      this.portfolioModel.filtered.Education = education;
    });
  }

  /** Loads the accomplishments. */
  private getAccomplishments(): void {
    this.dataService.getAccomplishments().pipe(take(1)).subscribe((accomplishments) => {
      if (this.isEmpty(accomplishments)) { return; }
      accomplishments = accomplishments.filter((_: Course) => !this.excelDateFormatterService.inTheFuture(_.Started));
      // this.accomplishments = accomplishments;
      this.portfolioModel.cv.Courses = accomplishments;
      this.portfolioModel.filtered.Accomplishments = accomplishments;
      this.calcCountCache(['Accomplishment']);
    });
  }

  /** Loads the publications. */
  private getPublications(): void {
    this.dataService.getPublications().pipe(take(1)).subscribe((publications) => {
      if (this.isEmpty(publications)) { return; }
      // this.publications = publications;
      this.portfolioModel.cv.Publications = publications;
      this.portfolioModel.filtered.Publications = publications;
      this.calcCountCache(['Publication']);
    });
  }

  /** Loads the projects. */
  private getProjects(): void {
    this.dataService.getProjects().pipe(take(1)).subscribe((projects) => {
      if (this.isEmpty(projects)) { return; }
      this.portfolioModel.projects = projects;
      this.portfolioModel.filtered.Projects = projects;
      this.calcCountCache(['Project', 'Accomplishment']);
    });
  }

  /** Loads the entities. */
  private getEntities(): void {
    this.dataService.getEntities().pipe(take(1)).subscribe((entities) => {
      if (this.isEmpty(entities)) { return; }
      this.entitiesAdjusterService.adjustEntities(entities);
      this.portfolioModel.entities = entities;
    });
  }

  /** Loads the UI. */
  private getUi(): void {
    this.dataService.getUi().pipe(take(1)).subscribe((ui) => {
      if (this.isEmpty(ui)) { return; }
      this.portfolioModel.ui = ui;
    });
  }

  /** Loads the general timeline. */
  private getGeneralTimeline(): void {
    this.dataService.getGeneralTimeline().pipe(take(1)).subscribe((generalTimeline) => {
      if (!this.isEmpty(generalTimeline)) {
        generalTimeline = generalTimeline.filter((_: GeneralTimelineEntry) => !this.excelDateFormatterService.inTheFuture(_.From));
        this.portfolioModel.generalTimeline = generalTimeline;
        this.portfolioModel.filtered.TimelineEvents = generalTimeline;
      }
    });
  }

  /**
   * Whether an object is empty.
   *
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: Record<string, unknown> | Record<string, unknown>[]): boolean {
    return obj instanceof Array ? (obj as Array<any>).length === 0 : Object.keys(obj).length === 0;
  }

  /** Calculates the count cache for the property types registered and refreshes the clients, delegate. */
  private calcCountCache(propertyNames: string[]) { this.countCacheService.calcCountCache(propertyNames); }
}

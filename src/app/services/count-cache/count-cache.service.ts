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

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';

import { UiService } from '../../services/ui/ui.service';
import { ChartService } from '../../services/chart/chart.service';

import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';

import { Indexable } from '../../interfaces/indexable';
import { Language } from '../../interfaces/cv/language';
import { Project } from '../../interfaces/project/project';

/**
 * A count cache service.
 */
@Injectable({
  providedIn: 'root'
})
export class CountCacheService {
  /** Aggregation count cache. */
  /** Aggregation count cache getter. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /** Frequencies cache. */
  /** Frequencies cache getter. */
  public get frequenciesCache() { return this.entitiesModel.frequenciesCache; }
  /** Frequencies cache setter. */
  public set frequenciesCache(value) { this.entitiesModel.frequenciesCache = value; }

  /** Project period decrypted. */
  public decryptedPeriod: Indexable = {};

  /** Filtered getter. */
  public get filtered() { return this.portfolioModel.filtered; }

  /**
   * Constructs the count cache service.
   * ~constructor
   *
   * @param uiService The UI service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public readonly uiService: UiService,
    private readonly tagCloudProcessorService: TagCloudProcessorService,
    private readonly portfolioModel: PortfolioModel,
    private readonly entitiesModel: EntitiesModel,
    private readonly chartService: ChartService,
  ) {
  }

  /**
   * Gets the project period decrypted for a project
   *
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string {
    const period = 'Period';
    return this.decryptedPeriod[project[period]];
  }

  /**
   * One person team project indicator.
   *
   * @param project The project index
   */
  public getProjectIsOnePersonTeam(project: Project): boolean {
    const teamSize = 'Team size';
    return project[teamSize] === 1;
  }

  /** Calculates the count cache and refreshes project charts. */
  public calcCountCache(propertyNames: string[]) {
    this.calcCountCacheProper(propertyNames);

    if (propertyNames.length === 0 || propertyNames.includes('Project')) {
      this.chartService.refreshCharts();
    }
  }

  /** Calculates the count cache for the property types registered and refreshes the clients. */
  // eslint-disable-next-line max-lines-per-function
  private calcCountCacheProper(propertyNames: string[]) {
    // if (propertyNames.length === 0) {
    propertyNames = ['Project', 'Language', 'Accomplishment', 'Publication'];
    // }

    this.countCache = {};

    this.calcCountCacheProjectsFrequencies(propertyNames);
    if (propertyNames.includes('Language')) {
      this.calcFrequencies(this.filtered.Languages, 'Language');
    }
    if (propertyNames.includes('Accomplishment')) {
      this.calcFrequencies(this.filtered.Certifications, 'Certification');
      this.calcFrequencies(this.filtered.Courses, 'Name');
      this.calcFrequencies(this.filtered.Organizations, 'Organization');
      this.calcFrequencies(this.filtered.HonorsAndAwards, 'Honor and Award');
      this.calcFrequencies(this.filtered.Volunteering, 'Volunteering');
      this.calcFrequencies(this.filtered.InterestsAndHobbies, 'Interest and Hobby');
      this.calcFrequencies(this.filtered.Vacation, 'Vacation');
    }
    if (propertyNames.includes('Publication')) {
      this.calcFrequencies(this.filtered.Publications, 'Title');
    }
    if (propertyNames.includes('Project')) {
      this.calcCountCacheProjects();
    }
  }

  /** Preprocesses the project frequencies. */
  private calcCountCacheProjectsFrequencies(propertyNames: string[]) {
    if (propertyNames.includes('Project')) {
      for (const propertyName of [
        'Project',
        'Client', 'Country', 'Industry', 'Project type', 'System type',
        'Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools', 'Methodology and practices',
        'Role', /* 'Responsibilities', */ 'Team size', 'Position', 'Reference'
      ]) {
        this.calcFrequencies(this.filtered.Projects, propertyName);
      }
      this.calcFrequencies(this.filtered.Projects, 'Responsibilities', undefined, true);
    }
  }

  /** Calculates the count cache for the projects. */
  private calcCountCacheProjects() {
    // calc sections start project and count cache
    let i = 0;
    let lastPeriod = '';
    const propertyName = 'New Period';
    for (const project of this.filtered.Projects) {
      const period = this.getDecryptedProjectPeriod(project);
      if (period === lastPeriod) {
        project[propertyName] = '';
      } else {
        project[propertyName] = period;

        this.countCache[lastPeriod] = i;
        lastPeriod = period;
        i = 0;
      }
      i++;
    }
    this.countCache[lastPeriod] = i;
  }

  /**
   * Checkes if the section toggle state is collapsed.
   *
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public checkToggleCollapsed(propertyName?: string): boolean {
    // if (this.persistenceService.getToggle(propertyName)['content-class'] === 'collapse') {
    //     this.countCache[propertyName] = 0;
    //     this.frequenciesCache[propertyName] = [];
    //     return true;
    // }

    return false;
  }

  /**
   * Calculates a splitter and then delegates to a service to calculate the frequency of occurrence of any value parts
   * in a collection objects' property based on that splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string. Optional.
   * @param ai Whether to apply lexical analysis euristics when parsing each value encountered. Optional.
   *
   * @description
   * Also updates count and caches result.
   */
  private calcFrequencies(collection: any, propertyName: string, splitter: string = ', ', ai: boolean = false) {
    const frequenciesCacheKey = this.frequenciesCacheKey(collection, propertyName);
    const key = frequenciesCacheKey.key;
    propertyName = frequenciesCacheKey.propertyName;

    if (this.checkToggleCollapsed()) { return; }

    this.countCache[key] = 0;

    const entries = this.tagCloudProcessorService.calcFrequencies(collection, propertyName, splitter, ai);
    if ((typeof entries === 'undefined')) {
      return;
    }

    this.updateCount(key, entries.length);

    this.frequenciesCache[key] = entries;
  }

  /**
   * Calculates a frequencies cache key.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   *
   * @returns FrequenciesCacheKey calculated and modified propertyName.
   */
  private frequenciesCacheKey(collection: any, propertyName: string) {
    let key = propertyName;

    if (['Language', 'Certification', 'Organization', 'Honor and Award', 'Volunteering',
      'Interest and Hobby', 'Vacation', 'Project'].includes(propertyName)) {
      if (propertyName === 'Language') {
        collection.forEach((_: Language) => {
          _.Name = _.Language;
          _.Strength = _.Share;
        });
      } else if (propertyName === 'Project') {
        collection.forEach((_: Project) => {
          _.Name = _['Project name'];
          _.Strength = Number(this.getProjectIsOnePersonTeam(_));
        });
      }
      key = propertyName;
      propertyName = 'Name';
    }

    return { key, propertyName };
  }

  /**
   * Updates an entity's count.
   *
   * @param propertyName The name of the property to process.
   * @param count The new count.
   */
  private updateCount(propertyName: string, count: number) {
    if (propertyName === '' || typeof propertyName === 'undefined') {
      return;
    }

    if (typeof this.countCache[propertyName] !== 'number') {
      this.countCache[propertyName] = 0;
    }

    this.countCache[propertyName] += count;

    const entities = this.portfolioModel.entities;

    if (!entities?.[propertyName]) {
      return;
    }

    const parentEntity = entities[propertyName].parent;

    this.updateCount(parentEntity, count);
  }
}

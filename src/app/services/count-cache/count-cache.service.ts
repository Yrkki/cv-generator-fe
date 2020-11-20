import { Injectable } from '@angular/core';

import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';
import { UiService } from '../../services/ui/ui.service';

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

  /** Entities getter. */
  public get entities() { return this.portfolioModel.entities; }
  /** Filtered getter. */
  public get filtered() { return this.portfolioModel.filtered; }

  /**
   * Constructs the count cache service.
   * ~constructor
   *
   * @param generalTimelineService The general timeline service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public generalTimelineService: GeneralTimelineService,
    public uiService: UiService,
    private tagCloudProcessorService: TagCloudProcessorService,
    private portfolioModel: PortfolioModel,
    private entitiesModel: EntitiesModel
  ) {
  }

  /**
   * Gets the project period decrypted for a project
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string {
    const period = 'Period';
    return this.decryptedPeriod[project[period]];
  }

  /** Calculates the count cache for the property types registered and refreshes the clients. */
  public calcCountCache(propertyNames: string[]) {
    // if (propertyNames.length === 0) {
    propertyNames = ['Project', 'Language', 'Accomplishment', 'Publication'];
    // }

    this.countCache = {};

    if (propertyNames.includes('Project')) {
      for (const propertyName of [
        'Client',
        'Country',
        'Industry',
        'Project type',
        'System type',

        'Platform',
        'Architecture',
        'Languages and notations',
        'IDEs and Tools',
        'Methodology and practices',

        'Role',
        // 'Responsibilities',
        'Team size',
        'Position',
        'Reference']) {
        this.calcFrequencies(this.filtered.Projects, propertyName);
      }
      this.calcFrequencies(this.filtered.Projects, 'Responsibilities', undefined, true);
    }

    if (propertyNames.includes('Language')) {
      this.calcFrequencies(this.filtered.Languages, 'Language');
    }

    if (propertyNames.includes('Accomplishment')) {
      this.calcFrequencies(this.filtered.Certifications, 'Certification');
      this.calcFrequencies(this.filtered.Courses, 'Name');
      this.calcFrequencies(this.filtered.Organizations, 'Organization');
      this.calcFrequencies(this.filtered.Volunteering, 'Volunteering');
    }

    if (propertyNames.includes('Publication')) {
      this.calcFrequencies(this.filtered.Publications, 'Title');
    }

    if (propertyNames.includes('Project')) {
      this.calcCountCacheProjects();
    }
  }

  /** Calculates the count cache for the projects. */
  private calcCountCacheProjects() {
    // calc sections start project and count cache
    let i = 0;
    let lastPeriod = '';
    for (const filtered of this.filtered.Projects) {
      const project = filtered as Project;
      const period = this.getDecryptedProjectPeriod(project);
      if (period === lastPeriod) {
        project['New Period'] = '';
      } else {
        project['New Period'] = period;
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
    let frequenciesCacheKey = propertyName;
    // if (['Language', 'Certification', 'Organization', 'Volunteering', 'Vacation'].includes(propertyName)) {
    if (['Language', 'Certification', 'Organization', 'Volunteering'].includes(propertyName)) {
      if (propertyName === 'Language') {
        collection.forEach((_: Language) => {
          _.Name = _.Language;
          _.Strength = _.Share;
        });
      }
      frequenciesCacheKey = propertyName;
      propertyName = 'Name';
    }

    if (this.checkToggleCollapsed()) { return; }

    this.countCache[frequenciesCacheKey] = 0;

    const entries = this.tagCloudProcessorService.calcFrequencies(collection, propertyName, splitter, ai);
    if ((typeof entries === 'undefined')) {
      return;
    }

    this.updateCount(frequenciesCacheKey, entries.length);

    this.frequenciesCache[frequenciesCacheKey] = entries;
  }

  /**
   * Updates an entity's count.
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

    if (!this.entities || this.entities[propertyName] == null) {
      return;
    }

    const parentEntity = this.entities[propertyName].parent;

    this.updateCount(parentEntity, count);
  }
}

import { Injectable } from '@angular/core';

import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';
import { UiService } from '../../services/ui/ui.service';

import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';

import { Indexable } from '../../interfaces/indexable';
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

  /** Filtered certifications for the current search context. */
  /** Filtered certifications getter. */
  public get filteredCertifications() { return this.portfolioModel.filteredCertifications; }

  /** Filtered courses for the current search context. */
  /** Filtered courses getter. */
  public get filteredCourses() { return this.portfolioModel.filteredCourses; }

  /** Filtered organizations for the current search context. */
  /** Filtered organizations getter. */
  public get filteredOrganizations() { return this.portfolioModel.filteredOrganizations; }

  /** Filtered publications for the current search context. */
  /** Filtered publications getter. */
  public get filteredPublications() { return this.portfolioModel.filteredPublications; }
  /** Filtered publications setter. */
  public set filteredPublications(value) { this.portfolioModel.filteredPublications = value; }

  /** Filtered projects for the current search context. */
  /** Filtered projects getter. */
  public get filteredProjects() { return this.portfolioModel.filteredProjects; }
  /** Filtered projects setter. */
  public set filteredProjects(value) { this.portfolioModel.filteredProjects = value; }

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
  public calcCountCache() {
    this.countCache = {};

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
      this.calcFrequencies(this.filteredProjects, propertyName);
    }
    this.calcFrequencies(this.filteredProjects, 'Responsibilities', undefined, true);

    this.calcFrequencies(this.filteredCertifications, 'Certification');
    this.calcFrequencies(this.filteredCourses, 'Name');
    this.calcFrequencies(this.filteredOrganizations, 'Organization');

    this.calcFrequencies(this.filteredPublications, 'Title');

    // calc sections start project and count cache
    let i = 0;
    let lastPeriod = '';
    for (const filteredProject of this.filteredProjects) {
      const project = filteredProject as Project;
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
    if (['Certification', 'Organization'].includes(propertyName)) {
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

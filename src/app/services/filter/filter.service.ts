import { Injectable, EventEmitter } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';

import { ChartService } from '../../services/chart/chart.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';
import { CountCacheService } from '../count-cache/count-cache.service';

import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { Language } from '../../interfaces/cv/language';
import { Publication } from '../../interfaces/cv/publication';
import { Project } from '../../interfaces/project/project';

/**
 * A filter service.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  /** Data getter. */
  public get data() {
    return {
      cv: this.portfolioModel.cv,
      entities: this.portfolioModel.entities,
      projects: this.portfolioModel.projects,
      ui: this.portfolioModel.ui
    };
  }

  /** Search query string expression changed event. */
  public readonly searchTokenChanged$ = new EventEmitter<string>();

  /** Search query string expression setter. */
  public searchTokenChangeHandler() {
    this.portfolioModel.filtered.Projects = this.calcFilteredProjects();
    // this.portfolioModel.filtered.Languages = this.data.cv.Languages;
    this.portfolioModel.filtered.Languages = this.calcFilteredLanguages();
    this.portfolioModel.filtered.Accomplishments = this.calcFilteredAccomplishments();
    this.portfolioModel.filtered.Publications = this.calcFilteredPublications();
    this.portfolioModel.filtered.ProfessionalExperience = this.calcFilteredProfessionalExperience();
    this.portfolioModel.filtered.Education = this.calcFilteredEducation();
    this.calcCountCache([]);
    this.searchTokenChanged$.emit(this.portfolioModel.searchToken);
  }

  /** Empty frequency getter delegate. */
  public get emptyFrequency() { return this.getEmptyFrequency(''); }

  /** Empty frequency. */
  public getEmptyFrequency(propertyNameKey: string) {
    return [
      propertyNameKey,
      {
        Count: 1,
        Percentage: 100,
        Lightness: 0,
        Size: 16,
        Weight: 400,
        get Label() { return ''; },
        get ShortLabel() { return ''; }
      }
    ];
  }

  /** Project frequency getter. */
  public projectFrequency(project: Project): any[] {
    const propertyNameKey = 'Project name';
    const propertyName = project[propertyNameKey];
    const frequencies: [string, Record<string, unknown>][] = this.entitiesModel.frequenciesCache.Project;
    return frequencies?.find((_) => _[0] === propertyName) ?? this.emptyFrequency;
  }

  /**
   * Constructs the Filter service.
   * ~constructor
   *
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    private readonly chartService: ChartService,
    private readonly searchEngineService: SearchEngineService,
    private readonly countCacheService: CountCacheService,
    private readonly portfolioModel: PortfolioModel,
    private readonly entitiesModel: EntitiesModel
  ) {
  }

  /** Calculates the count cache for the property types registered and refreshes the clients. */
  private calcCountCache(propertyNames: string[]) {
    this.countCacheService.calcCountCache(propertyNames);
    if (propertyNames.length === 0 || propertyNames.includes('Project')) {
      this.chartService.refreshCharts();
    }
  }

  /**
   * Calculates the filtered projects for the current search context.
   *
   * @returns The filtered projects for the current search context.
   */
  private calcFilteredProjects(): Project[] {
    if (typeof this.data.projects === 'undefined') { return []; }

    const retVal = this.calcFiltered<Project>(this.data.projects);

    return retVal;
  }

  /**
   * Calculates the filtered languages for the current search context.
   *
   * @returns The filtered languages for the current search context.
   */
  private calcFilteredLanguages(): Language[] {
    if (typeof this.data.cv === 'undefined') { return []; }
    if (typeof this.data.cv.Languages === 'undefined') { return []; }

    const retVal = this.calcFiltered<Language>(this.data.cv.Languages);

    return retVal;
  }

  /**
   * Calculates the filtered accomplishments for the current search context.
   *
   * @returns The filtered accomplishments for the current search context.
   */
  private calcFilteredAccomplishments(): Accomplishment[] {
    if (typeof this.data.cv === 'undefined') { return []; }
    if (typeof this.data.cv.Courses === 'undefined') { return []; }

    const retVal = this.calcFiltered<Accomplishment>(this.data.cv.Courses);

    return retVal;
  }

  /**
   * Calculates the filtered publications for the current search context.
   *
   * @returns The filtered publications for the current search context.
   */
  private calcFilteredPublications(): Publication[] {
    if (typeof this.data.cv === 'undefined') { return []; }
    if (typeof this.data.cv.Publications === 'undefined') { return []; }

    const retVal = this.calcFiltered<Publication>(this.data.cv.Publications);

    return retVal;
  }

  /**
   * Calculates the filtered professional experiences for the current search context.
   *
   * @returns The filtered professional experiences for the current search context.
   */
  private calcFilteredProfessionalExperience(): ProfessionalExperience[] {
    const retVal = this.calcFiltered<ProfessionalExperience>(this.data.cv['Professional experience']);

    // console.log('Debug: calcFilteredProfessionalExperience', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered education entries for the current search context.
   *
   * @returns The filtered education entries for the current search context.
   */
  private calcFilteredEducation(): Education[] {
    const retVal = this.calcFiltered<Education>(this.data.cv.Education);

    // console.log('Debug: calcFilteredEducation', retVal);
    return retVal;
  }

  /**
   * Performs the search.
   * @param array The assay to filter.
   *
   * @returns Filtered array according to the current search context.
   */
  private calcFiltered<T>(array: Array<T>): Array<T> {
    return this.searchEngineService.search<T>(array, this.portfolioModel.searchToken);
  }
}

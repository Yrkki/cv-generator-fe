import { Injectable, QueryList, TemplateRef } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';

import { ChartService } from '../../services/chart/chart.service';
import { PersistenceService } from '../persistence/persistence.service';
import { CountCacheService } from '../count-cache/count-cache.service';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { FilterService } from '../filter/filter.service';

import { Project } from '../../interfaces/project/project';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { HeaderComponent } from 'src/app/components/header/header.component';

/**
 * A portfolio service.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  /** CV getter. */
  public get cv() { return this.portfolioModel.cv; }

  /** Entities getter. */
  public get entities() { return this.portfolioModel.entities; }

  /** Projects getter. */
  public get projects() { return this.portfolioModel.projects; }

  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }

  /** Aggregation count cache. */
  /** Aggregation count cache getter. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /** Filtered getter. */
  public get filtered() { return this.portfolioModel.filtered; }

  /** Search query string expression getter. */
  public get SearchToken(): string { return this.portfolioModel.searchToken; }
  /** Search query string expression setter. */
  public set SearchToken(value: string) {
    this.portfolioModel.searchToken = value;
    this.filterService.searchTokenChangeHandler();
  }

  /** Search query string expression changed event delegate. */
  public readonly searchTokenChanged$ = this.filterService.searchTokenChanged$;

  /** Tag cloud getter. */
  public get tagCloud(): TagCloudDisplayMode {
    return Number.parseInt(this.persistenceService.getItem('tagCloud') ?? '1', 10) || TagCloudDisplayMode.tagCloud;
  }
  /** Tag cloud setter. */
  public set tagCloud(value: TagCloudDisplayMode) {
    this.persistenceService.setItem('tagCloud', value.toString());

    this.chartService.refreshCharts();
    this.searchTokenChanged$.emit(this.SearchToken);
  }

  /** Edit mode getter. */
  public get editMode() {
    return this.persistenceService.getItem('edit mode') === 'true';
  }

  /** Decorations getter. */
  public get decorations() {
    const value = this.persistenceService.getItem('decorations') === 'true';

    const stylePropertyAppearance3D = '--appearance-3d';
    const stylePropertyHrDisplay = '--hr-display';
    const oldValue = document.documentElement.style.getPropertyValue(stylePropertyAppearance3D);
    if (value) {
      if (oldValue !== '1') {
        document.documentElement.style.setProperty(stylePropertyAppearance3D, '1');
        document.documentElement.style.setProperty(stylePropertyHrDisplay, 'none');
      }
    } else {
      if (oldValue !== '0') {
        document.documentElement.style.setProperty(stylePropertyAppearance3D, '0');
        document.documentElement.style.setProperty(stylePropertyHrDisplay, 'block');
      }
    }

    return value;
  }
  /** Decorations setter. */
  public set decorations(value) {
    this.persistenceService.setItem('decorations', value.toString());
  }

  /** Pagination getter. */
  public get pagination() {
    return this.persistenceService.getItem('pagination') === 'true';
  }
  /** Pagination setter. */
  public set pagination(value) {
    this.persistenceService.setItem('pagination', value.toString());
  }

  /** Columns getter. */
  public get columns(): { [index: string]: boolean } {
    return JSON.parse(this.persistenceService.getItem('columns') ?? '{}');
  }
  /** Columns setter. */
  public set columns(value: { [index: string]: boolean }) {
    this.persistenceService.setItem('columns', JSON.stringify(value));
  }

  /** Project period decrypted getter. */
  public get decryptedPeriod() { return this.countCacheService.decryptedPeriod; }

  /** Project frequency getter delegate. */
  public projectFrequency(project: Project): any[] { return this.filterService.projectFrequency(project); }

  /** Empty frequency delegate. */
  public getEmptyFrequency(propertyNameKey: string) { return this.filterService.getEmptyFrequency(propertyNameKey); }

  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   * @param dataLoaderService The data loader service injected dependency.
   * @param filterService The filter service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public readonly persistenceService: PersistenceService,
    private readonly dataLoaderService: DataLoaderService,
    public readonly filterService: FilterService,
    private readonly chartService: ChartService,
    private readonly countCacheService: CountCacheService,
    private readonly portfolioModel: PortfolioModel,
    private readonly entitiesModel: EntitiesModel
  ) {
  }

  /** Load data delegate. */
  public LoadData() { this.dataLoaderService.LoadData(); }

  /**
   * One person team project indicator.
   * ~delegate
   *
   * @param project The project index
   */
  public getProjectIsOnePersonTeam(project: Project): boolean { return this.countCacheService.getProjectIsOnePersonTeam(project); }

  /**
   * Project starts new period indicator.
   * @param project The project index
   */
  public getProjectStartsNewPeriod(project: Project): boolean {
    const newPeriod = 'New Period';
    return project[newPeriod] !== '';
  }

  /**
   * Project period decrypted delegate
   * ~delegate
   *
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string { return this.countCacheService.getDecryptedProjectPeriod(project); }

  /**
   * Whether UI is defined.
   *
   * @returns Whether the UI is defined.
   */
  public uiDefined(): boolean {
    return this.jsonDefined(this.ui);
  }

  /**
   *  Whether entities are defined.
   *
   * @returns Whether the entities are defined.
   */
  public entitiesDefined(): boolean {
    return this.jsonDefined(this.entities);
  }

  /**
   *  Whether CV is defined.
   *
   * @returns Whether the CV is defined.
   */
  public cvDefined(): boolean {
    return this.jsonDefined(this.cv);
  }

  /**
   *  Whether projects are defined.
   *
   * @returns Whether the projects are defined.
   */
  public projectsDefined(): boolean {
    return this.jsonDefined(this.projects);
  }

  /**
   *  Whether the general timeline is defined.
   *
   * @returns Whether the general timeline is defined.
   */
  public generalTimelineDefined(): boolean {
    return true;
  }

  /**
   * Whether a specific json is defined.
   * @param json The json to check.
   *
   * @returns Whether the json is defined.
   */
  public jsonDefined(json: any): boolean {
    return typeof json !== 'undefined' && this.isInitialized(json);
  }

  /**
   * Whether an object is empty.
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Whether an object is initialized.
   * @param obj The object to check.
   *
   * @returns Whether an object is initialized.
   */
  private isInitialized(obj: Record<string, unknown>): boolean {
    // return Object.values(obj).some(value => value.length > 0);
    // return !this.isEmpty(obj) && obj !== {} && obj !== [];
    return JSON.stringify(obj).length > 50;
  }

  /**
   * Gets the calculated frequencies object for an entity.
   * @param project The entity.
   *
   * @returns The calculated frequencies object for an entity.
   */
  public getFrequenciesCache(propertyName: string): any[] {
    return this.entitiesModel.frequenciesCache[propertyName];
  }

  /**
   * Checkes if the section toggle state is collapsed.
   * ~delegate
   *
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public checkToggleCollapsed(propertyName: string): boolean { return this.countCacheService.checkToggleCollapsed(propertyName); }

  /**
   * Updates the search with a new search query initiating a new search.
   * @param newValue The new search query.
   */
  public updateSearchToken(newValue: string) {
    // newValue = '\"' + newValue.replace('\"', '\\\"') + '\"';
    this.SearchToken = newValue;
  }

  /** Columns class. */
  public getColumnsClass(value: string): string {
    return (this.columns[value] ? 'columns2' : 'columns1') + ' clear-both';
  }
}

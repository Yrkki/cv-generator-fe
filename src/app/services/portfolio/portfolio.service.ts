import { Injectable } from '@angular/core';

import { ModelModel } from '../../model/model/model.model';

import { ToolbarService } from '../toolbar/toolbar.service';
import { PersistenceService } from '../persistence/persistence.service';
import { CountCacheService } from '../count-cache/count-cache.service';

import { Project } from '../../interfaces/project/project';

/**
 * A portfolio service.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  /** Project period decrypted getter. */
  public get decryptedPeriod() { return this.countCacheService.decryptedPeriod; }

  /** Current project period. */
  public currentProjectPeriod?: Project;

  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param toolbarService The toolbar service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly toolbarService: ToolbarService,
    public readonly persistenceService: PersistenceService,
    private readonly countCacheService: CountCacheService,
    public readonly model: ModelModel,
  ) {
  }

  /**
   * One person team project indicator.
   * ~delegate
   *
   * @param project The project index
   */
  public getProjectIsOnePersonTeam(project: Project): boolean { return this.countCacheService.getProjectIsOnePersonTeam(project); }

  /**
   * Project starts new period indicator.
   *
   * @param project The project index
   */
  public getProjectStartsNewPeriod(project: Project): boolean {
    const retVal = project.Period !== this.currentProjectPeriod?.Period;
    this.currentProjectPeriod = project;
    return retVal;
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
    return this.jsonDefined(this.model.portfolioModel.ui);
  }

  /**
   *  Whether entities are defined.
   *
   * @returns Whether the entities are defined.
   */
  public entitiesDefined(): boolean {
    return this.jsonDefined(this.model.portfolioModel.entities);
  }

  /**
   *  Whether CV is defined.
   *
   * @returns Whether the CV is defined.
   */
  public cvDefined(): boolean {
    return this.jsonDefined(this.model.portfolioModel.cv);
  }

  /**
   *  Whether projects are defined.
   *
   * @returns Whether the projects are defined.
   */
  public projectsDefined(): boolean {
    return this.jsonDefined(this.model.portfolioModel.projects);
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
   *
   * @param json The json to check.
   *
   * @returns Whether the json is defined.
   */
  public jsonDefined(json: any): boolean {
    return typeof json !== 'undefined' && this.isInitialized(json);
  }

  /**
   * Whether an object is empty.
   *
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Whether an object is initialized.
   *
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
   *
   * @param project The entity.
   *
   * @returns The calculated frequencies object for an entity.
   */
  public getFrequenciesCache(propertyName: string): any[] {
    return this.model.entitiesModel.frequenciesCache[propertyName];
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
}

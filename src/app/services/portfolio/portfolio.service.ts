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
import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { EngineService } from '../../services/engine/engine.service';
import { ModelModel } from '../../model/model/model.model';

import { ToolbarService } from '../toolbar/toolbar.service';
import { PersistenceService } from '../persistence/persistence.service';
import { CountCacheService } from '../count-cache/count-cache.service';

import { Project } from '../../interfaces/project/project';
import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';

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
   * @param engine The engine service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly toolbarService: ToolbarService,
    public readonly persistenceService: PersistenceService,
    private readonly countCacheService: CountCacheService,
    public readonly engine: EngineService,
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
    return this.jsonDefined(this.model.ui);
  }

  /**
   *  Whether entities are defined.
   *
   * @returns Whether the entities are defined.
   */
  public entitiesDefined(): boolean {
    return this.jsonDefined(this.model.entities);
  }

  /**
   *  Whether CV is defined.
   *
   * @returns Whether the CV is defined.
   */
  public cvDefined(): boolean {
    return this.jsonDefined(this.model.cv);
  }

  /**
   *  Whether projects are defined.
   *
   * @returns Whether the projects are defined.
   */
  public projectsDefined(): boolean {
    return this.jsonDefined(this.model.projects);
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
  public getFrequenciesCache(frequenciesCacheKey: string): any[] {
    return this.checkToggleCollapsed(frequenciesCacheKey) ? [] : this.model.frequenciesCache[frequenciesCacheKey];
    // return this.model.model.frequenciesCache[frequenciesCacheKey];
  }

  /**
   * Get frequency. Match frequency for the template to the precalculated cache.
   * ~delegate
   *
   * @param frequenciesCacheKey The frequencies cache key.
   * @param propertyName The name of the property to process.
   *
   * @returns The frequency object.
   */
  public getFrequency(frequenciesCacheKey: string, propertyName: string) {
    let frequency;

    try {
      const frequencyCache = this.getFrequenciesCache(frequenciesCacheKey);
      // const frequencyCache = this.checkToggleCollapsed(frequenciesCacheKey) ? [] : this.getFrequenciesCache(frequenciesCacheKey);

      frequency = frequencyCache.find((_) => _[0] === propertyName);
    } catch (err) {
      frequency = this.engine.filterService.getEmptyFrequency(propertyName);
    }

    return frequency;
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

  /** Subscribe dispatcher */
  /**
   * Subscribe dispatcher.
   * ~delegate
   *
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public subscribe<T extends ResponsiveChangedEvent | string>(kind: 'ST' | 'RM', handler: (event: T) => void): Subscription | undefined {
    let eventEmitter: EventEmitter<any> | undefined;
    switch (kind) {
      case 'ST': eventEmitter = this.engine.searchService.searchTokenChanged$; break;
      case 'RM': eventEmitter = this.toolbarService.responsiveModelChanged$; break;
      default: eventEmitter = undefined; break;
    }
    return eventEmitter?.subscribe((event: T) => handler(event));
  }
}

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
import { FilteredModel } from '../../model/filtered/filtered.model';
import { EntitiesModel } from '../../model/entities/entities.model';

/**
 * The main model.
 */
@Injectable({
  providedIn: 'root'
})
export class ModelModel {
  //#region portfolioModel
  /** CV getter delegate. */
  public get cv() { return this.portfolioModel.cv; }
  /** CV setter delegate. */
  public set cv(value) { this.portfolioModel.cv = value; }

  /** Projects getter delegate. */
  public get projects() { return this.portfolioModel.projects; }
  /** Projects setter delegate. */
  public set projects(value) { this.portfolioModel.projects = value; }

  /** General timeline data getter delegate. */
  public get generalTimeline() { return this.portfolioModel.generalTimeline; }
  /** General timeline setter delegate. */
  public set generalTimeline(value) { this.portfolioModel.generalTimeline = value; }
  //#endregion

  //#region filteredModel
  /** Filtered getter delegate. */
  public get filtered() { return this.filteredModel.filtered; }

  /** Search query string expression getter delegate. */
  public get searchToken(): string { return this.filteredModel.searchToken; }
  /** Search query string expression setter delegate. */
  public set searchToken(value: string) { this.filteredModel.searchToken = value; }
  //#endregion

  //#region entitiesModel
  /** Entities getter delegate. */
  public get entities() { return this.entitiesModel.entities; }
  /** Entities setter delegate. */
  public set entities(value) { this.entitiesModel.entities = value; }

  /** UI data getter delegate. */
  public get ui() { return this.entitiesModel.ui; }
  /** UI data setter delegate. */
  public set ui(value) { this.entitiesModel.ui = value; }

  /** Aggregation count cache getter delegate. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter delegate. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /** Frequencies cache getter delegate. */
  public get frequenciesCache() { return this.entitiesModel.frequenciesCache; }
  /** Frequencies cache setter delegate. */
  public set frequenciesCache(value) { this.entitiesModel.frequenciesCache = value; }
  //#endregion

  /**
   * Constructs the model.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param filteredModel The filtered model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    private readonly portfolioModel: PortfolioModel,
    private readonly filteredModel: FilteredModel,
    private readonly entitiesModel: EntitiesModel
  ) {
  }
}

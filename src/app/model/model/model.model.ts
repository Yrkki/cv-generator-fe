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

/**
 * The main model.
 */
@Injectable({
  providedIn: 'root'
})
export class ModelModel {
  /** CV getter. */
  public get cv() { return this.portfolioModel.cv; }

  /** Entities getter. */
  public get entities() { return this.portfolioModel.entities; }

  /** Projects getter. */
  public get projects() { return this.portfolioModel.projects; }

  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }

  /** General timeline data getter. */
  public get generalTimeline() { return this.portfolioModel.generalTimeline; }

  /** Filtered getter. */
  public get filtered() { return this.portfolioModel.filtered; }

  /** Aggregation count cache getter. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /**
   * Constructs the model.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public readonly portfolioModel: PortfolioModel,
    public readonly entitiesModel: EntitiesModel
  ) {
  }
}

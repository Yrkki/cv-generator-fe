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

import { Entity } from './../../interfaces/entities/entity';
import { Entities } from '../../classes/entities/entities';

import { ChartService } from '../../services/chart/chart.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { CountCacheService } from '../count-cache/count-cache.service';

/**
 * EntitiesAdjuster connection service.
 */
@Injectable({
  providedIn: 'root'
})
export class EntitiesAdjusterService {
  private readonly entityIds: Record<string, string> = {
    Certifications: 'Certification',
    Languages: 'Language',
    Courses: 'Name',
    Organizations: 'Organization',
    Publications: 'Title',
  };

  /**
   * Constructs the entities adjuster service.
   * ~constructor
   *
   * @param chartService The chart service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   */
  constructor(
    private readonly chartService: ChartService,
    private readonly countCacheService: CountCacheService,
  ) {
  }

  /**
   * Adjusts the entities.
   *
   * @param entities The entities.
   */
  public adjustEntities(entities: Entities) {
    for (const key in entities) {
      if (Object.prototype.hasOwnProperty.call(entities, key)) {
        const entity = entities[key];

        // adjusts the entities
        this.adjustEntityKeys(key, entity);
        this.adjustEntitySection(key, entity);
        this.adjustEntityOther(key, entity);

        // calculate chart name
        entity.chart = this.chartService.chartName(key);

        // calculate variant names
        entity.content = StringExService.snakeCase(this.variantName(key, 'content'));
        entity.displayColumns = this.countCacheService.uiService.uiText('columns');
        entity.displayContentColumns = this.countCacheService.uiService.uiText('content columns');
        entity.displayLayoutColumns = this.countCacheService.uiService.uiText('layout columns');
        entity.columns = this.variantName(key, entity.displayColumns);
        entity.contentColumns = this.variantName(key, entity.displayContentColumns);
        entity.layoutColumns = this.variantName(key, entity.displayLayoutColumns);
      }
    }
  }

  /**
   * Adjusts the entity keys.
   *
   * @param key The type of element.
   * @param entity The entity.
   */
  private adjustEntityKeys(key: string, entity: Entity) {
    entity.key = key;
    entity.cacheKey = Object.prototype.hasOwnProperty.call(this.entityIds, key) ? this.entityIds[key] ?? key : key;
  }

  /**
   * Adjusts the entity section.
   *
   * @param key The type of element.
   * @param entity The entity.
   */
  private adjustEntitySection(key: string, entity: Entity) {
    // start calculating section
    entity.section = entity.node;
    entity.section = StringExService.toTitleCase(entity.section);

    // adjust some words' case
    if (['IDEs and Tools'].includes(key)) { entity.section = entity.node; }

    // prefix some with 'By'
    // ...

    // pluralise others
    if (['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
      'Role', 'Responsibilities', 'Team size', 'Position', 'Reference'].includes(key)) {
      if (entity.section.substr(entity.section.length - 1) !== 's') { entity.section += 's'; }
    }

    // specially pluralise others
    // ...

    // completely change others
    if (['General Timeline Map'].includes(key)) { entity.section = ''; }
  }

  /**
   * Adjusts the entity other properties.
   *
   * @param key The type of element.
   * @param entity The entity.
   */
  private adjustEntityOther(key: string, entity: Entity) {
    // apply AI to some
    entity.AI = ['Responsibilities'].includes(key);

    // apply emSymbol to some
    entity.emSymbol = entity.key.includes('Map');

    // fix encrypted periods when needed
    if (['Contemporary Period', 'Modern Age', 'Renaissance', 'Dark Ages'].includes(key)) {
      this.countCacheService.decryptedPeriod[entity.node] = key;
      entity.node = key;
    }
  }

  /**
   * Names a variant element.
   *
   * @param key The type of element.
   * @param variant The variant name.
   *
   * @returns The variant element name.
   */
  private variantName(key: string, variant: string): string {
    return key + ' ' + variant;
  }
}

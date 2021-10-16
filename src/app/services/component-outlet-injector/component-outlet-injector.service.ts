// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { Injectable, Injector } from '@angular/core';
import { Params } from './../../services/component-outlet-injector/params';
import { Indexable } from '../../interfaces/indexable';
import { logger } from '../../services/logger/logger.service';

/**
 * The injector service for use with component outles.
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentOutletInjectorService {
  /** Length of the injector cache key in characters.
   *
   * Data-dependent. Should be large enough to guarantee uniqueness within the cache.
   */
  private readonly keyLength = 120;

  /** The injector. */
  private injector?: Injector;
  /** The injector cache. */
  private injectorCache: Indexable = {};
  /** Whether initialized. */
  private initialaized = false;

  /**
   * Class initializer.
   *
   * @param injector The injector passed.
   * @param injectorCache The injector cache to maintain by the service.
   */
  init(injector: Injector, injectorCache: Indexable) {
    this.injector = injector;
    this.injectorCache = injectorCache;
    this.initialaized = true;
  }

  /**
   * Injector getter.
   *
   * @param propertyName The parameter index.
   * @param i The sequential index when requested.
   *
   * @returns An injector from the cache.
   */
  getInjector(propertyName: Indexable, i?: number): Injector {
    if (!this.initialaized) {
      logger.error('ComponentOutletInjectorService: Not initialized.');
      // return undefined;
    }

    const key = JSON.stringify(propertyName).substr(0, this.keyLength);
    let injector = this.injectorCache[key];
    if (typeof injector === 'undefined') {
      // console.log('Debug: In Injector: key: ', key);
      injector = Injector.create({ providers: [{ provide: Params, deps: [] }], parent: this.injector });
      const params: any = injector.get(Params);
      params.propertyName = propertyName;
      params.i = i;
    }
    this.injectorCache[key] = injector;
    return injector;
  }
}

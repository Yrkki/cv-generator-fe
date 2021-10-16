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
import { Injectable, InjectionToken } from '@angular/core';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { SorterService } from '../../services/sorter/sorter.service';

import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Sorter service factory
 */
@Injectable({
  providedIn: 'root',
})
export class SorterServiceFactory {
  /**
   * Token description prefix.
   */
  private static get tokenDescriptionPrefix() { return 'SorterService'; }

  /**
   * SorterKind values.
   */
  public static get SorterKindValues() {
    return Object.values(SorterKind).filter((_) => !isNaN(Number(_))) as SorterKind[];
  }

  /**
   * Module specific providers.
   */
  public static get providers() {
    return SorterServiceFactory.SorterKindValues.map((sorterKind) => ({
      provide: SorterServiceFactory.tokenDescription(sorterKind), useFactory: (
        uiService: UiService,
        persistenceService: PersistenceService
      ) => SorterServiceFactory.useFactory(sorterKind, uiService, persistenceService),
      deps: [UiService, PersistenceService]
    }));
  }

  /**
   * Constructs the sorter service factory.
   * ~constructor
   *
   */
  constructor(
  ) {
  }

  /**
   * Constructs the sorter component. Static construction factory.
   * ~static constructor
   *
   * @param sorterKind The sorter kind injected dependency.
   * @param deps The factory dependencies.
   */
  public static useFactory(
    sorterKind: SorterKind,
    ...deps: (PersistenceService | UiService |
      (PersistenceService | UiService)[])[]
  ) {
    const serviceInstance = new SorterService(
      deps[0] as UiService,
      deps[1] as PersistenceService
    );
    serviceInstance.sorterKind = sorterKind;
    return serviceInstance;
  }

  /**
   * Token description.
   *
   * @param sorterKind The sorter kind injected dependency.
   */
  public static tokenDescription(sorterKind: SorterKind) {
    return SorterServiceFactory.tokenDescriptionPrefix + SorterKind[sorterKind];
  }

  /**
   * Injection token providers.
   *
   * @param sorterKind The sorter kind injected dependency.
   * @param deps The factory dependencies.
   */
  public static InjectionToken(
    sorterKind: SorterKind,
    ...deps: (PersistenceService | UiService |
      (PersistenceService | UiService)[])[]
  ) {
    return new InjectionToken<SorterService>(SorterServiceFactory.tokenDescription(sorterKind), {
      providedIn: 'root',
      factory: () => SorterServiceFactory.useFactory(sorterKind, ...deps)
    });
  }
}

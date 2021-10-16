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
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * A truncator service.
 */
@Injectable({
  providedIn: 'root'
})
export class TruncatorServiceFactory {
  /**
   * Token description prefix.
   */
  private static get tokenDescriptionPrefix() { return 'TruncatorService'; }

  /**
   * TruncatorKind values.
   */
  public static get TruncatorKindValues() {
    return Object.values(TruncatorKind).filter((_) => !isNaN(Number(_))) as TruncatorKind[];
  }

  /**
   * Module specific providers.
   */
  public static get providers() {
    return TruncatorServiceFactory.TruncatorKindValues.map((truncatorKind) => ({
      provide: TruncatorServiceFactory.tokenDescription(truncatorKind), useFactory: (
        persistenceService: PersistenceService
      ) => TruncatorServiceFactory.useFactory(truncatorKind, persistenceService),
      deps: [PersistenceService]
    }));
  }

  /**
   * Constructs the Truncator service factory.
   * ~constructor
   *
   */
  constructor(
  ) {
  }

  /**
   * Constructs the truncator component. Static construction factory.
   * ~static constructor
   *
   * @param truncatorKind The truncator kind injected dependency.
   * @param deps The factory dependencies.
   */
  public static useFactory(
    truncatorKind: TruncatorKind,
    ...deps: (PersistenceService |
      (PersistenceService)[])[]
  ) {
    const serviceInstance = new TruncatorService(
      deps[0] as PersistenceService
    );
    serviceInstance.truncatorKind = truncatorKind;
    return serviceInstance;
  }

  /**
   * Token description.
   *
   * @param truncatorKind The truncator kind injected dependency.
   */
  public static tokenDescription(truncatorKind: TruncatorKind) {
    return TruncatorServiceFactory.tokenDescriptionPrefix + TruncatorKind[truncatorKind];
  }

  /**
   * Injection token providers.
   *
   * @param truncatorKind The truncator kind injected dependency.
   * @param deps The factory dependencies.
   */
  public static InjectionToken(
    truncatorKind: TruncatorKind,
    ...deps: (PersistenceService |
      (PersistenceService)[])[]
  ) {
    return new InjectionToken<TruncatorService>(TruncatorServiceFactory.tokenDescription(truncatorKind), {
      providedIn: 'root',
      factory: () => TruncatorServiceFactory.useFactory(truncatorKind, ...deps)
    });
  }
}

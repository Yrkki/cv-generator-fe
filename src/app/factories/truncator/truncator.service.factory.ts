// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
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

import { Injectable, InjectionToken } from '@angular/core';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import { ToggleKind } from '../../enums/toggle-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { PersistenceService } from '../persistence/persistence.service';
import { StringExService } from '../string-ex/string-ex.service';

/**
 * A truncator service.
 */
@Injectable({
  providedIn: 'root'
})
export class TruncatorService {
  /** Focus threshold display values */
  public static readonly focusThresholdDefaults: ReadonlyMap<TruncatorKind, number> = new Map([
    [TruncatorKind.Cv, 20],
    [TruncatorKind.Ps, 30],
    [TruncatorKind.Pp, 5]
  ]);
  /** Focus threshold display value. */
  public static readonly focusThresholdDisplayValue = 'focus threshold';
  /** Focus threshold property name. */
  public static readonly focusThresholdPropertyName = StringExService.toPascalCase(TruncatorService.focusThresholdDisplayValue);

  /** Truncator kind. */
  public truncatorKind!: TruncatorKind;

  /** Tag cloud emphasis getter. */
  public get TagCloudEmphasis() {
    const displayValue = ToggleComponent.displayValues.get(ToggleKind.TagCloudEmphasis) ?? '';
    const key = `${TruncatorKind[this.truncatorKind].toUpperCase()} ${displayValue}`;
    return this.persistenceService.getItem(key) === 'true';
  }
  /** Tag cloud emphasis setter. */
  public set TagCloudEmphasis(value) {
    const displayValue = ToggleComponent.displayValues.get(ToggleKind.TagCloudEmphasis) ?? '';
    const key = `${TruncatorKind[this.truncatorKind].toUpperCase()} ${displayValue}`;
    this.persistenceService.setItem(key, value.toString());
  }

  /** Focus threshold getter. */
  public get FocusThreshold() {
    const key = `${TruncatorKind[this.truncatorKind]}${TruncatorService.focusThresholdPropertyName}`;
    return Number.parseInt(
      this.persistenceService.getItem(key)
      ?? TruncatorService.focusThresholdDefaults.get(this.truncatorKind)?.toString()
      ?? '20', 10
    );
  }
  /** Focus threshold setter. */
  public set FocusThreshold(value) {
    const key = `${TruncatorKind[this.truncatorKind]}${TruncatorService.focusThresholdPropertyName}`;
    this.persistenceService.setItem(key, value.toString());
  }

  /**
   * TruncatorKind values.
   */
  static get TruncatorKindValues() {
    return Object.values(TruncatorKind).filter(_ => !isNaN(Number(_))) as TruncatorKind[];
  }

  /**
   * Module specific providers.
   */
  static get providers() {
    return TruncatorService.TruncatorKindValues.map(truncatorKind => ({
      provide: TruncatorService.tokenDescription(truncatorKind), useFactory: (
        persistenceService: PersistenceService
      ) => TruncatorService.useFactory(truncatorKind, persistenceService),
      deps: [PersistenceService]
    }));
  }

  /**
   * Token description prefix.
   */
  private static get tokenDescriptionPrefix() { return 'TruncatorService'; }

  /**
   * Token description.
   *
   * @param truncatorKind The truncator kind injected dependency.
   */
  static tokenDescription(truncatorKind: TruncatorKind) {
    return TruncatorService.tokenDescriptionPrefix + TruncatorKind[truncatorKind];
  }

  /**
   * Injection token providers.
   *
   * @param truncatorKind The truncator kind injected dependency.
   * @param deps The factory dependencies.
   */
  static InjectionToken(
    truncatorKind: TruncatorKind,
    ...deps: (PersistenceService |
      (PersistenceService)[])[]
  ) {
    return new InjectionToken<TruncatorService>(TruncatorService.tokenDescription(truncatorKind), {
      providedIn: 'root',
      factory: () => TruncatorService.useFactory(truncatorKind, ...deps)
    });
  }

  /**
   * Constructs the truncator component. Static construction factory.
   * ~static constructor
   *
   * @param truncatorKind The truncator kind injected dependency.
   * @param deps The factory dependencies.
   */
  static useFactory(
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
   * Constructs the Truncator service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /**
   * Truncated collection.
   *
   * @param collection The collection to process.
   *
   * @returns The truncated collection.
   */
  public truncated(collection: any[]): any[] {
    return collection ? collection.slice(0, this.FocusThreshold) : [];
  }

  /**
   * Remaining collection.
   *
   * @param collection The collection to process.
   *
   * @returns The remaining collection.
   */
  public remaining(collection: any[]): any[] {
    return collection ? collection.slice(this.FocusThreshold) : [];
  }

  /**
   * Remaining collection length.
   *
   * @param collection The collection to process.
   *
   * @returns The remaining collection length.
   */
  public remainingLength(collection: any[]): number {
    return collection ? collection.length - this.FocusThreshold : 0;
  }

  /** Template model value setter function. */
  public modelChange(propertyName: string, value: any) {
    (this as any)[propertyName] = value;
  }
}

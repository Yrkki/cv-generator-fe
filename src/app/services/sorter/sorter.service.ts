import { Injectable, InjectionToken } from '@angular/core';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { SortOrder } from '../../enums/sort-order.enum';
import { Go } from '../../enums/go.enum';

import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Sorter service
 */
@Injectable({
  providedIn: 'root',
})
export class SorterService {
  /** Sort fields key. */
  public sortFieldsKey!: SorterKind;

  /** Sort field key fully qualified name, used to prefix other identifiers. */
  public get sortFieldKeyFull() { return 'sortField' + SorterKind[this.sortFieldsKey]; }

  /** Sort field keys fully qualified name. */
  public get sortFieldKeysFull() { return this.sortFieldKeyFull + 's'; }

  /** Sort field key index fully qualified name. */
  public get sortFieldKeyIndexFull() { return this.sortFieldKeyFull + 'Index'; }

  /** Sort field key index order fully qualified name. */
  public get sortFieldKeyIndexOrderFull() { return this.sortFieldKeyFull + 'IndexOrder'; }

  /** Sort order direction getter. */
  public get sortOrderDirection() { return ['△', '▽']; }

  /** Sort field index next direction getter. */
  public get sortFieldIndexNextDirection() { return ['ᐳ', 'ᐸ']; }

  /** Sort field defaults. */
  public get sortFieldsDefaults() {
    return this.sortFieldsKey === SorterKind.Accomplishments ? '["Id","Name","URL","Authority name","Authority URL","Authority image"' +
      ',"Type","Level","Strength"' +
      ',"Location","Started","Completed","Expiration"' +
      ',"Certificate number","Certificate URL","Certificate image","Certificate image URL","Certificate logo","Certificate tag"' +
      ',"Color"]'
      : this.sortFieldsKey === SorterKind.Publications ? '["Id","From","To","Article","Artile autchor","Article date"' +
        ',"Title","Subtitle"' +
        ',"Translation Article","Translation Title","Translation Subtitle","Translator"' +
        ',"Editor","Publisher","Publication date","Type","Author"' +
        ',"City","Page count","Pages","Size","Format","ISBN"' +
        ',"URL","Publication image","Description"' +
        ',"Color"]'
        : this.sortFieldsKey === SorterKind.Spectrum ? '["Count","Significance","Maximality","Lightness","Size"' +
          ',"Weight","Label","ShortLabel"]'
          : this.sortFieldsKey === SorterKind.Projects ? '["Id"' +
            ',"Project name","Scope","Client","Logo","Country","Industry","Project type","System type"' +
            ',"Platform","Architecture","Languages and notations","IDEs and Tools","Methodology and practices"' +
            ',"Team size","Responsibilities","Role","Position","From","To","Months total","Duration total","Reference"' +
            ',"Links","Photos","Attribution","Client link","Period","Color"]'
            : '[]';
  }

  /** Sort fields getter. */
  private get sortFields() {
    let serializedStringArray = this.sortFieldsDefaults;
    if (this.persistenceService) {
      serializedStringArray = this.persistenceService.getItem(this.sortFieldKeysFull) || serializedStringArray;
    }
    return JSON.parse(serializedStringArray) as string[];
  }
  /** Sort fields setter. */
  private set sortFields(value) {
    this.persistenceService.setItem(this.sortFieldKeysFull, JSON.stringify(value));
  }

  /** Sort field index getter. */
  public get sortFieldIndex() {
    if (!this.persistenceService) { return 0; }
    return Number.parseInt(this.persistenceService.getItem(this.sortFieldKeyIndexFull) ?? '0', 10);
  }
  /** Sort field index setter. */
  public set sortFieldIndex(value) {
    if (this.sortFields.length > 0) {
      value = this.clamp(value, this.sortFields.length);
    }
    this.persistenceService.setItem(this.sortFieldKeyIndexFull, value.toString());
  }

  /** Sort order getter. */
  public get sortOrder(): SortOrder {
    if (!this.persistenceService) { return 0; }
    return Number.parseInt(this.persistenceService.getItem(this.sortFieldKeyIndexOrderFull) ?? '0', 10);
  }
  /** Sort order setter. */
  public set sortOrder(value) {
    this.persistenceService.setItem(this.sortFieldKeyIndexOrderFull, value.toString());
  }

  /** Is in natural order predicate. */
  public get isInNaturalOrder() {
    return this.sortFieldIndex === 0 && this.sortOrder === SortOrder.Ascending;
  }

  /**
   * SorterKind values.
   */
  static get SorterKindValues() {
    return Object.values(SorterKind).filter((_) => !isNaN(Number(_))) as SorterKind[];
  }

  /**
   * Module specific providers.
   */
  static get providers() {
    return SorterService.SorterKindValues.map((sortFieldsKey) => ({
      provide: SorterService.tokenDescription(sortFieldsKey), useFactory: (
        uiService: UiService,
        persistenceService: PersistenceService
      ) => SorterService.useFactory(sortFieldsKey, uiService, persistenceService),
      deps: [UiService, PersistenceService]
    }));
  }

  /**
   * Token description prefix.
   */
  private static get tokenDescriptionPrefix() { return 'SorterService'; }

  /**
   * Token description.
   *
   * @param sortFieldsKey The sort fields key injected dependency.
   */
  static tokenDescription(sortFieldsKey: SorterKind) {
    return SorterService.tokenDescriptionPrefix + SorterKind[sortFieldsKey];
  }

  /**
   * Injection token providers.
   *
   * @param sortFieldsKey The sort fields key injected dependency.
   * @param deps The factory dependencies.
   */
  static InjectionToken(
    sortFieldsKey: SorterKind,
    ...deps: (PersistenceService | UiService |
      (PersistenceService | UiService)[])[]
  ) {
    return new InjectionToken<SorterService>(SorterService.tokenDescription(sortFieldsKey), {
      providedIn: 'root',
      factory: () => SorterService.useFactory(sortFieldsKey, ...deps)
    });
  }

  /**
   * Constructs the sorter component. Static construction factory.
   * ~static constructor
   *
   * @param sortFieldsKey The sort fields key injected dependency.
   * @param deps The factory dependencies.
   */
  static useFactory(
    sortFieldsKey: SorterKind,
    ...deps: (PersistenceService | UiService |
      (PersistenceService | UiService)[])[]
  ) {
    const serviceInstance = new SorterService(
      deps[0] as UiService,
      deps[1] as PersistenceService
    );
    serviceInstance.sortFieldsKey = sortFieldsKey;
    return serviceInstance;
  }

  /**
   * Constructs the sorter component.
   * ~constructor
   *
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    private readonly uiService: UiService,
    private readonly persistenceService: PersistenceService,
  ) {
  }

  /** Sort field getter. */
  public sortField(value: number) {
    if (this.sortFields.length === 0) {
      return '';
    }
    value = this.clamp(value, this.sortFields.length);
    return this.sortFields[value];
  }

  /** Floored division modulo operation getter. */
  private clamp(n: number, m: number) {
    const d = n % m;
    return d < 0 ? d + m : d;
  }

  /** Next potential sort field. */
  private nextPotentialSortField(sortFieldIndex: number, sortOrder: SortOrder, sortFieldIndexNext = Go.Forward) {
    sortOrder = 1 - sortOrder;
    if (sortFieldIndexNext === Go.Forward) {
      if (sortOrder === SortOrder.Ascending) {
        sortFieldIndex++;
      }
    } else if (sortFieldIndexNext === Go.Back) {
      if (sortOrder === SortOrder.Descending) {
        sortFieldIndex--;
      }
    }
    if (this.sortFields.length > 0) {
      sortFieldIndex = this.clamp(sortFieldIndex, this.sortFields.length);
    }
    return { sortFieldIndex, sortOrder };
  }

  /** Next sort. */
  nextSort(event: MouseEvent, sortFieldIndexNext = Go.Forward) {
    const nextPotentialSortField = this.nextPotentialSortField(this.sortFieldIndex, this.sortOrder, sortFieldIndexNext);
    this.sortFieldIndex = nextPotentialSortField.sortFieldIndex;
    this.sortOrder = nextPotentialSortField.sortOrder;
    event.stopPropagation();
  }

  /** Next sort title. */
  public nextSortTitle(sortFieldIndexNext = Go.Forward) {
    const nextPotentialSortField = this.nextPotentialSortField(this.sortFieldIndex, this.sortOrder, sortFieldIndexNext);
    const tokens = [
      this.uiService.uiText('Click here to change prioritization from'),

      this.sortField(this.sortFieldIndex).toLowerCase(),
      this.sortOrderDirection[this.sortOrder],

      this.uiService.uiText('to'),

      this.sortField(nextPotentialSortField.sortFieldIndex).toLowerCase(),
      this.sortOrderDirection[nextPotentialSortField.sortOrder]
    ];
    return tokens.join(' ');
  }

  /** Sorted collection. */
  public sorted(collection: any[], sortField = this.sortField(this.sortFieldIndex), sortOrder = 2 * this.sortOrder - 1): any[] {
    if (!collection) { return []; }

    collection.sort((a, b) => {
      if ([SorterKind.Spectrum].includes(this.sortFieldsKey)) {
        a = a[1];
        b = b[1];
      }
      const aFrequencyWordCount = a;
      const aFrequencyWordCountField = aFrequencyWordCount[sortField];
      const bFrequencyWordCount = b;
      const bFrequencyWordCountField = bFrequencyWordCount[sortField];
      if (aFrequencyWordCountField < bFrequencyWordCountField) { return sortOrder; }
      if (aFrequencyWordCountField > bFrequencyWordCountField) { return -sortOrder; }
      return 0;
    });
    return collection;
  }
}

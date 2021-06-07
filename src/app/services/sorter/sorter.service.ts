import { Injectable } from '@angular/core';
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
  /** Sorter kind. */
  public sorterKind!: SorterKind;

  /** Defaults getter. */
  private get defaults() {
    return [
      '["Id","Name","URL","Authority name","Authority URL","Authority image"' +
      ',"Type","Level","Strength"' +
      ',"Location","Started","Completed","Expiration"' +
      ',"Certificate number","Certificate URL","Certificate image","Certificate image URL","Certificate logo","Certificate tag"' +
      ',"Color"]',
      '["Id","From","To","Article","Article author","Article date"' +
      ',"Title","Subtitle"' +
      ',"Translation Article","Translation Title","Translation Subtitle","Translator"' +
      ',"Editor","Publisher","Publication date","Type","Author"' +
      ',"City","Page count","Pages","Size","Format","ISBN"' +
      ',"URL","Publication image","Description"' +
      ',"Color"]',
      '["Count","Significance","Maximality","Lightness","Size"' +
      ',"Weight","Label","ShortLabel"]',
      '["Id"' +
      ',"Project name","Scope","Client","Logo","Country","Industry","Project type","System type"' +
      ',"Platform","Architecture","Languages and notations","IDEs and Tools","Methodology and practices"' +
      ',"Team size","Responsibilities","Role","Position","From","To","Months total","Duration total","Reference"' +
      ',"Links","Photos","Attribution","Client link","Period","Color"]'
    ][this.sorterKind];
  }

  /** Sort field subservice. */
  public get subSortField() {
    return {
      /** Sorter kind. */
      sorterKind: this.sorterKind,
      /** Defaults. */
      defaults: this.defaults,
      /** Fully qualified name, used to prefix other identifiers, getter. */
      get full() { return 'sortField' + SorterKind[this.sorterKind]; },
      /** Persistence name getter. */
      get sFull() { return this.full + 's'; },
      /** Index name getter. */
      get indexFull() { return this.full + 'Index'; },
      /** Index order name getter. */
      get indexOrderFull() { return this.full + 'IndexOrder'; },
      /** Order direction getter. */
      get orderDirection() { return ['△', '▽']; },
      /** Index next direction getter. */
      get indexNextDirection() { return ['ᐸᐸ', 'ᐸ', 'ᐳ']; },
    };
  }

  /** Sort fields getter. */
  private get sortFields() {
    const serializedStringArray = this.persistenceService.getItem(this.subSortField.sFull) ?? this.subSortField.defaults;
    return JSON.parse(serializedStringArray) as string[];
  }
  /** Sort fields setter. */
  private set sortFields(value) {
    this.persistenceService.setItem(this.subSortField.sFull, JSON.stringify(value));
  }

  /** Sort field index getter. */
  public get sortFieldIndex(): number {
    return Number.parseInt(this.persistenceService.getItem(this.subSortField.indexFull) ?? '0', 10);
  }
  /** Sort field index setter. */
  public set sortFieldIndex(value) {
    value = this.clamp(value, this.sortFields.length);
    this.persistenceService.setItem(this.subSortField.indexFull, value.toString());
  }

  /** Sort order getter. */
  public get sortOrder(): SortOrder {
    return Number.parseInt(this.persistenceService.getItem(this.subSortField.indexOrderFull) ?? '0', 10);
  }
  /** Sort order setter. */
  public set sortOrder(value) {
    this.persistenceService.setItem(this.subSortField.indexOrderFull, value.toString());
  }

  /**
   * Constructs the sorter service.
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
    value = this.clamp(value, this.sortFields.length);
    return this.sortFields[value];
  }

  /** Floored division modulo operation getter. */
  private clamp(n: number, m: number) {
    if (m === 0) { return n; }

    const d = n % m;
    return d < 0 ? d + m : d;
  }

  /** Next potential sort field. */
  private nextPotentialSortField(sortFieldIndex: number, sortOrder: SortOrder, sortFieldIndexNext = Go.Forward) {
    if (sortFieldIndexNext === Go.Home) {
      sortOrder = this.sorterKind === SorterKind.Spectrum ? SortOrder.Descending : SortOrder.Ascending;
      sortFieldIndex = 0;
    } else {
      const nudgedPotentialSortField = this.nudgePotentialSortField(sortFieldIndex, sortOrder, sortFieldIndexNext);
      sortOrder = nudgedPotentialSortField.sortOrder;
      sortFieldIndex = nudgedPotentialSortField.sortFieldIndex;
    }
    sortFieldIndex = this.clamp(sortFieldIndex, this.sortFields.length);
    return { sortFieldIndex, sortOrder };
  }

  /** Nudge potential sort field to next adjacent one, raw. */
  private nudgePotentialSortField(sortFieldIndex: number, sortOrder: SortOrder, sortFieldIndexNext = Go.Forward) {
    sortOrder = 1 - sortOrder;
    if (sortFieldIndexNext === Go.Back && sortOrder === SortOrder.Descending) {
      sortFieldIndex--;
    } else if (sortFieldIndexNext === Go.Forward && sortOrder === SortOrder.Ascending) {
      sortFieldIndex++;
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
      this.subSortField.orderDirection[this.sortOrder],

      this.uiService.uiText('to'),

      this.sortField(nextPotentialSortField.sortFieldIndex).toLowerCase(),
      this.subSortField.orderDirection[nextPotentialSortField.sortOrder]
    ];
    return tokens.join(' ');
  }

  /** Sorted collection. */
  public sorted(collection: any[], sortField = this.sortField(this.sortFieldIndex), sortOrder = 2 * this.sortOrder - 1): any[] {
    if (!collection) { return []; }

    collection.sort((a, b) => this.sortFunctional(a, b, sortField, sortOrder));
    return collection;
  }

  /** Sort functional. */
  private sortFunctional(a: any, b: any, sortField: string, sortOrder: number) {
    if ([SorterKind.Spectrum].includes(this.sorterKind)) {
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
  }
}

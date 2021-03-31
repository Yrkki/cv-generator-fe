import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

import { Indexable } from '../../interfaces/indexable';

/**
 * Toggle component
 */
@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  /** Display values */
  public static readonly displayValues: ReadonlyMap<ToggleKind, string> = new Map([
    [ToggleKind.InstantSearch, 'instant search'],
    [ToggleKind.ContentColumns, 'content columns'],
    [ToggleKind.LayoutColumns, 'layout columns'],
    [ToggleKind.TagCloudEmphasis, 'tag cloud emphasis'],
    [ToggleKind.Pagination, 'pagination'],
    [ToggleKind.Decorations, 'decorations'],
    [ToggleKind.Expand, 'expand']
  ]);

  /** Toggle kind. */
  @Input() public toggleKind!: ToggleKind;

  /** Entity key. */
  @Input() public entityKey = ''; // keyof Entities;

  /** Model changed event emitter. */
  @Output() public readonly modelChanged = new EventEmitter<boolean>();

  /** Toggle clickable element. */
  @ViewChild('clickableToggle') clickableToggle!: ElementRef<HTMLSpanElement>;
  /** Toggle input element. */
  @ViewChild('inputToggle') inputToggle!: ElementRef<HTMLInputElement>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Context. */
  @Input() public context?: {
    position?: string;
    value?: string;
    displayValue?: string;
    model?: boolean;
    subject?: Record<string, any>;
    propertyName?: string;
    sliderClass?: string;
  };
  /** Position getter. */
  public get position() { return this.context?.position ?? ''; }
  /** Value getter. */
  public get value() { return this.context?.value ?? ''; }
  /** Slider class getter. */
  public get sliderClass() { return this.context?.sliderClass ?? 'slider'; }

  /** Display value getter. */
  public get displayValue(): string {
    // if (this.context?.displayValue) { return this.context.displayValue; }
    return ToggleComponent.displayValues.get(this.toggleKind) ?? '';
  }

  /** Model getter. */
  public get model(): boolean {
    // if (this.context?.model) { return this.context.model; }

    const propertyName = this.propertyName;
    if (this.multiModel) {
      const columns = JSON.parse(this.persistenceService.getItem(this.multiModel) ?? '{}') as Indexable<boolean>;
      return Object.prototype.hasOwnProperty.call(columns, propertyName) ? columns[propertyName] : false;
    } else {
      return this.persistenceService.getItem(propertyName) === 'true';
    }
  }
  /** Model setter. */
  public set model(value: boolean) {
    // if (this.context?.model) {
    //   // (this.context?.subject ?? this)[this.propertyName] = value;
    //   this.context.model = value;
    //   return;
    // }

    const propertyName = this.propertyName;
    if (this.multiModel) {
      const columns = JSON.parse(this.persistenceService.getItem(this.multiModel) ?? '{}') as Indexable<boolean>;
      this.persistenceService.setItem(this.multiModel, JSON.stringify({ ...columns, [propertyName]: value }));
    } else {
      this.persistenceService.setItem(propertyName, value.toString());
    }

    this.modelChanged.emit(value);
  }

  /** Property name getter. */
  /*eslint complexity: ["error", 6]*/
  public get propertyName(): string {
    // if (this.context?.propertyName) { return this.context.propertyName; }

    let value;
    switch (this.toggleKind) {
      //#region Legacy persistence keys

      // case ToggleKind.ContentColumns:
      // case ToggleKind.LayoutColumns:
      //   value = `${this.entityKey} ${this.displayValue}`;
      //   break;

      case ToggleKind.Expand:
        value = `${StringExService.capitalize(this.displayValue)} ${this.entityKey}`;
        break;

      case ToggleKind.InstantSearch:
        value = ToggleKind[this.toggleKind];
        break;

      case ToggleKind.Decorations:
      case ToggleKind.Pagination:
        value = `${this.displayValue}`;
        break;

      case ToggleKind.TagCloudEmphasis:
        value = `${StringExService.acronym(this.entityKey)} ${this.displayValue}`;
        break;

      //#endregion Legacy persistence keys

      default:
        value = `${this.entityKey} ${this.displayValue}`;
        break;
    }
    return value;
  }

  /** Decorations getter. */
  public get decorations() {
    return this.persistenceService.getItem('decorations') === 'true';
  }

  /** Model getter. */
  private get multiModel(): string | undefined {
    switch (this.toggleKind) {
      case ToggleKind.ContentColumns: return 'columns';
      case ToggleKind.LayoutColumns: return 'columns';
      default: return void 0;
    }
  }

  /**
   * ToggleKind values.
   */
  static get ToggleKindValues() {
    return Object.values(ToggleKind).filter((_) => !isNaN(Number(_))) as ToggleKind[];
  }

  /**
   * Constructs the toggle component.
   * ~constructor
   *
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly entitiesService: EntitiesService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
  }
}

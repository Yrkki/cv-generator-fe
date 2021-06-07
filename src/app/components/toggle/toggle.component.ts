import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { ToggleService } from '../../services/toggle/toggle.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';
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
  /** Visibility. */
  @Input() public visibility = true;

  /** Toggle kind. */
  @Input() public toggleKind!: ToggleKind;

  /** Entity key. */
  @Input() public entityKey = ''; // keyof Entities;

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

  /** Model changed event emitter. */
  @Output() public readonly modelChanged = new EventEmitter<ResponsiveChangedEvent>();

  /** Toggle clickable element. */
  @ViewChild('clickableToggle') clickableToggle!: ElementRef<HTMLSpanElement>;
  /** Toggle input element. */
  @ViewChild('inputToggle') inputToggle!: ElementRef<HTMLInputElement>;

  // /** Toggle kind enum template accessor getter. */
  // public get ToggleKind() { return ToggleKind; }

  /** Glyph. */
  public get glyph() { return StringExService.glyph(this.value.replace(this.entityKey, '')); }

  /** Position getter. */
  public get position() { return this.context?.position ?? this.entityKey ?? ''; }
  /** Value getter. */
  public get value() { return this.context?.value ?? this.displayValue ?? ''; }
  /** Slider class getter. */
  public get sliderClass() { return this.context?.sliderClass ?? 'slider'; }

  /** Display value getter. */
  public get displayValue(): string {
    // if (this.context?.displayValue) { return this.context.displayValue; }
    return this.toggleService.displayValue(this.toggleKind);
  }

  /** Model getter. */
  public get model(): boolean {
    // if (this.context?.model) { return this.context.model; }

    const propertyName = this.propertyName;
    const multiModel = this.toggleService.multiModel(this.toggleKind);
    if (multiModel) {
      const columns = JSON.parse(this.persistenceService.getItem(multiModel) ?? '{}') as Indexable<boolean>;
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
    const multiModel = this.toggleService.multiModel(this.toggleKind);
    if (multiModel) {
      const columns = JSON.parse(this.persistenceService.getItem(multiModel) ?? '{}') as Indexable<boolean>;
      this.persistenceService.setItem(multiModel, JSON.stringify({ ...columns, [propertyName]: value }));
    } else {
      this.persistenceService.setItem(propertyName, value.toString());
    }

    this.modelChanged.emit({ sourceEntityKey: this.entityKey, value });
  }

  /** Property name getter. */
  public get propertyName(): string {
    // if (this.context?.propertyName) { return this.context.propertyName; }

    if (this.toggleService.isSharedPropertyName(this.toggleKind)) { return this.displayValue; }

    let value;
    switch (this.toggleKind) {
      //#region Legacy persistence keys
      case ToggleKind.Expand:
        value = `${StringExService.capitalize(this.displayValue)} ${this.entityKey}`;
        break;
      case ToggleKind.InstantSearch:
        value = ToggleKind[this.toggleKind];
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

  /**
   * Constructs the toggle component.
   * ~constructor
   *
   * @param toggleService The toggle service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly toggleService: ToggleService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
  }
}

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
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { ToggleService } from '../../services/toggle/toggle.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ResponsiveChangedEvent } from '../../interfaces/events/responsive-changed-event';
import { Indexable } from '../../interfaces/indexable';
import { ToggleProvider } from '../../classes/toggle/toggle-provider';

/**
 * ~extends {@link ToggleProvider}
 * Toggle component
 */
@Component({
  standalone: false,
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent extends ToggleProvider {
  /** Visibility. */
  @Input() public visibility = true;

  /** Toggle kind. */
  @Input() public toggleKind!: ToggleKind;

  // The entity key input moved to the ToggleProvider base, which the multi-toggle shares.

  /** Model changed event emitter. */
  @Output() public readonly modelChanged = new EventEmitter<ResponsiveChangedEvent>();

  /** Toggle clickable element. */
  @ViewChild('clickableToggle') clickableToggle!: ElementRef<HTMLSpanElement>;
  /** Toggle input element. */
  @ViewChild('inputToggle') inputToggle!: ElementRef<HTMLInputElement>;

  // /** Toggle kind enum template accessor getter. */
  // public get ToggleKind() { return ToggleKind; }

  /** Glyph. */
  public get glyph() { return this.glyphOf(this.value.replace(this.entityKey, '')); }

  /** Position getter. */
  public get position() { return this.context?.position ?? this.entityKey ?? ''; }
  /** Value getter. */
  public get value() { return this.context?.value ?? this.displayValue; }
  
  /** Tooltip getter, also the accessible name: a shared (global) setting gets no entity section prefix. */
  public get tooltip() {
    return this.tooltipOf(this.displayValue, this.toggleService.isSharedPropertyName(this.toggleKind) ? '' : this.entityKey);
  }

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

    this.toggleService.toolbarService.changeNotificationService.settingsChanged$.next();
    this.modelChanged.emit({ sourceEntityKey: this.entityKey, value });
  }

  /** Property name getter. */
  public get propertyName(): string {
    // if (this.context?.propertyName) { return this.context.propertyName; }

    // A shared (global) setting has one key for all its instances; any other is prefixed with its entity key.
    if (this.toggleService.isSharedPropertyName(this.toggleKind)) { return this.displayValue; }

    return `${this.entityKey} ${this.displayValue}`;
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
    toggleService: ToggleService,
    public readonly inputService: InputService,
    uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) {
    super(toggleService, uiService);
  }
}

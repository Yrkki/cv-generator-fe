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
import { Injectable } from '@angular/core';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * A toggle service.
 */
@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  /** Display values */
  public static readonly displayValues: ReadonlyMap<ToggleKind, string> = new Map([
    [ToggleKind.InstantSearch, 'instant search'],
    [ToggleKind.ContentColumns, 'content columns'],
    [ToggleKind.LayoutColumns, 'layout columns'],
    [ToggleKind.TagCloudEmphasis, 'tag cloud emphasis'],
    [ToggleKind.Responsive, 'responsive'],
    [ToggleKind.Context, 'context'],
    [ToggleKind.Pagination, 'pagination'],
    [ToggleKind.Tinted, 'tinted'],
    [ToggleKind.Microprinted, 'microprinted'],
    [ToggleKind.Captions, 'captions'],
    [ToggleKind.Decorations, 'decorations'],
    [ToggleKind.Expand, 'expand'],
    [ToggleKind.EditMode, 'edit mode'],
    [ToggleKind.ToolbarCollapsed, 'toolbar collapsed'],
  ]);

  /** Captions getter. */
  public get captions() {
    return this.persistenceService.getItem('captions') === 'true';
  }

  /** Decorations getter. */
  public get decorations() {
    return this.persistenceService.getItem('decorations') === 'true';
  }

  /**
   * ToggleKind values.
   */
  public get toggleKindValues() {
    return Object.values(ToggleKind).filter((_) => !isNaN(Number(_))) as ToggleKind[];
  }

  /**
   * Constructs the Toggle service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /** Display value. */
  public displayValue(toggleKind: ToggleKind): string {
    return ToggleService.displayValues.get(toggleKind) ?? '';
  }

  /** Whether property is shared. */
  public isSharedPropertyName(toggleKind: ToggleKind) {
    return [
      ToggleKind.Tinted,
      ToggleKind.Microprinted,
      ToggleKind.Captions,
      ToggleKind.Decorations,
      ToggleKind.Context,
      ToggleKind.Pagination,
      ToggleKind.EditMode,
    ].includes(toggleKind);
  }

  /** Multi-model. */
  public multiModel(toggleKind: ToggleKind): string | undefined {
    switch (toggleKind) {
      case ToggleKind.ContentColumns: return 'columns';
      case ToggleKind.LayoutColumns: return 'columns';
      default: return void 0;
    }
  }
}

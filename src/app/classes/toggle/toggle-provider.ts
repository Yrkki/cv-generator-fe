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
import { ChangeDetectorRef, DestroyRef, Directive, Input, inject } from '@angular/core';
import { ToggleContext } from '../../interfaces/toggle/toggle-context';
import { ToggleService } from '../../services/toggle/toggle.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { UiService } from '../../services/ui/ui.service';
/**
 * Toggle provider. The shared base of the checkbox slider (toggle) and the radio slider (multi-toggle):
 * the host-supplied context, the decoration classes, the glyph captions and the zoneless refresh.
 */
@Directive()
export abstract class ToggleProvider {
  /** Context. */
  @Input() public context?: ToggleContext;
  /** Refreshes the view when loaded data or a persisted setting (decorations, captions...) changes. */
  private readonly changedSubscription = this.toggleService.toolbarService.changeNotificationService
    .markForCheckOnChanged(inject(ChangeDetectorRef), inject(DestroyRef));
  /** Slider class getter. */
  public get sliderClass() { return this.context?.sliderClass ?? 'slider'; }
  /** Radio slider class getter. */
  public get radiosliderClass() { return this.context?.radiosliderClass ?? 'radioslider'; }
  /**
   * Constructs the toggle provider.
   * ~constructor
   *
   * @param toggleService The toggle service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly toggleService: ToggleService,
    public readonly uiService: UiService,
  ) {
  }
  /**
   * Glyph.
   *
   * @param value The value to make a glyph of.
   *
   * @returns The glyph.
   */
  public glyphOf(value: string) { return StringExService.glyph(value); }
}

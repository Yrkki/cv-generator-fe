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
import { Ui } from '../../classes/ui/ui';

/**
 * UI adjuster service.
 *
 * A temporary shim, like the entities adjuster: it adjusts the loaded UI texts ahead of a backend data change.
 * Static, like the string extension service: it has no dependencies, so it costs no constructor parameter.
 *
 * Retiring a text, once the backend ui.json provides it:
 * 1. Add the entry to the backend ui.json, e.g. "Mode": { "text": "display mode" }, run the data pipelines and deploy
 *    the backend and the CDNs.
 * 2. Check that the app loads the new text: http://localhost:3000/json/ui.json (or the remote backend) shows it.
 * 3. Remove the entry from the texts below. The texts may stay empty: keep the service and its call in
 *    DataLoaderService.getUi() for the next shim.
 * 4. Update the expectations in ui-adjuster.service.spec.ts: an empty shim leaves the UI unchanged.
 */
@Injectable({
  providedIn: 'root'
})
export class UiAdjusterService {
  /** The UI texts the backend does not provide yet, by UI entry key. */
  private static readonly texts: Readonly<Record<string, string>> = {
    // the toggle state descriptions (the tooltips and the accessible names)
    responsive: 'responsive mode',
    'spaced out': 'spaced out',
    // the tag cloud display mode multi-toggle: the backend text is 'mode'
    Mode: 'display mode',
    // the classifier prefix: classification moves entities between sections (the sorter's 'by' orders within one)
    classify: 'classify',
    // the toolbar collapser label: a left-pointing triangle regardless of the decorations/captions settings
    'toolbar collapsed': '◁', // '\u25C1';
  };

  /**
   * Adjusts the UI texts.
   *
   * @param ui The UI.
   */
  public static adjustUi(ui: Ui) {
    for (const [key, text] of Object.entries(UiAdjusterService.texts)) {
      ui[key] = { ...ui[key], text };
    }
  }
}

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
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Indexable } from '../../interfaces/indexable';

import { SanitizerService } from '../../services/sanitizer/sanitizer.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Settings sharer component
 */
@Component({
  standalone: false,
  selector: 'app-settings-sharer',
  templateUrl: './settings-sharer.component.html',
  styleUrls: ['./settings-sharer.component.scss']
})
export class SettingsSharerComponent {
  /** The upload settings label element. */
  @ViewChild('uploadSettingsLabel') uploadSettingsLabel?: ElementRef<HTMLLabelElement>;

  /** The upload settings hidden input element. */
  @ViewChild('inputGroupUploadSettings') inputGroupUploadSettings?: ElementRef<HTMLInputElement>;

  /** The download settings clickable element. */
  @ViewChild('clickableDownloadSettings') clickableDownloadSettings?: ElementRef<HTMLAnchorElement>;

  /** The upload settings clickable element. */
  @ViewChild('clickableUploadSettings') clickableUploadSettings?: ElementRef<HTMLAnchorElement>;

  /** The default settings file name. */
  public get defaultSettingsFileName() { return 'settings' + this.defaultSettingsFileExtension; }

  /** The default settings file extension. */
  public get defaultSettingsFileExtension() { return '.json'; }

  /** Loads the settings. */
  public get settings() {
    return this.sanitizerService.sanitizeSecurityTrustUrl(
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.persistenceService.storage))
    );
  }

  /**
   * Constructs the settings sharer component.
   * ~constructor
   *
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param sanitizerService The DOM sanitizer service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public inputService: InputService,
    public uiService: UiService,
    private sanitizerService: SanitizerService,
    public persistenceService: PersistenceService,
  ) {
  }

  /**
   * Upload settings changed event handler.
   *
   * @param event The change event.
   */
  public onUploadSettingsChanged(event: Event) {
    const targetElement = event.currentTarget as HTMLInputElement;
    this.uploadSettingsChanged(targetElement);
  }

  /**
   * Upload settings changed handler.
   *
   * @param targetElement The target html element.
   */
  private uploadSettingsChanged(targetElement?: HTMLInputElement) {
    if (!targetElement) { return; }
    if (!targetElement.files || targetElement.files.length < 1) { return; }

    // get the file selection
    const selectedFile = targetElement.files[0];

    // reflect the name of file chosen in the ui text just in case
    if (this.uploadSettingsLabel) {
      this.uploadSettingsLabel.nativeElement.textContent = selectedFile.name;
    }

    // upload settings
    this.uploadSettings(selectedFile);
  }

  /**
   * Upload settings.
   *
   * @param selectedFile The selected file.
   */
  public uploadSettings(selectedFile: File) {
    // load settings from file into storage
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<EventTarget>) => {
      const settings = JSON.parse(
        reader.result!
          .toString()
      );
      this.updateStorage(settings);
    };
    reader.readAsBinaryString(selectedFile);

    // refresh view state
    this.persistenceService.restoreToggleAllSections();
  }

  /**
   * Update storage with settings.
   *
   * @param settings The settings.
   */
  private updateStorage(settings: Indexable) {
    const storage = this.persistenceService.storage;
    storage.clear();
    for (const key in settings) {
      if (Object.prototype.hasOwnProperty.call(settings, key)) {
        const value = settings[key];
        storage.setItem(key, value);
      }
    }
  }

  /**
   * Upload clicked handler.
   *
   * @param event The click event initiating the upload selection modal.
   */
  public onUploadClicked(event: MouseEvent) {
    event.preventDefault();
    this.uploadSettingsLabel?.nativeElement.click();
  }
}

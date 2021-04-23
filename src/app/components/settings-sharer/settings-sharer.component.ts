import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Settings sharer component
 */
@Component({
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
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage))
    );
  }

  /**
   * Constructs the settings sharer component.
   * ~constructor
   *
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param sanitizer The DOM sanitizer injected dependency.
   */
  constructor(
    public inputService: InputService,
    public uiService: UiService,
    public persistenceService: PersistenceService,
    private sanitizer: DomSanitizer
  ) {
  }

  /**
   * Upload settings changed handler.
   * @param event The change event.
   */
  // eslint-disable-next-line max-lines-per-function
  uploadSettingsChanged(event: Event) {
    const targetElement = event.currentTarget as HTMLInputElement;
    if (!targetElement) { return; }
    if (!targetElement.files || targetElement.files.length < 1) { return; }

    // get the file selection
    const selectedFile = targetElement.files[0];

    // reflect the name of file chosen in the ui text just in case
    if (this.uploadSettingsLabel) {
      this.uploadSettingsLabel.nativeElement.textContent = selectedFile.name;
    }

    // load settings from file into storage
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<EventTarget>) => {
      const settings = JSON.parse(reader.result?.toString() ?? '{}');

      const storage = this.persistenceService.storage;
      storage.clear();
      for (const key in settings) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
          const value = settings[key];
          storage.setItem(key, value);
        }
      }
    };
    reader.readAsBinaryString(selectedFile);

    // refresh view state
    this.persistenceService.restoreToggleAllSections();
  }

  /**
   * Upload clicked handler.
   * @param event The click event initiating the upload selection modal.
   */
  uploadClicked(event: MouseEvent) {
    event.preventDefault();
    this.uploadSettingsLabel?.nativeElement.click();
  }
}

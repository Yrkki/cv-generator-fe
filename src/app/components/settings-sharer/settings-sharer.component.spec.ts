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
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SettingsSharerComponent } from './settings-sharer.component';

import { FormsModule } from '@angular/forms';

import { provideHttpClientTesting } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('SettingsSharerComponent', () => {
  let component: SettingsSharerComponent;
  let fixture: ComponentFixture<SettingsSharerComponent>;
  let debugComponent: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [
        provideHttpClientTesting()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSharerComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    component.uiService.windowReload = TestingCommon.mockWindowReload;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check upload mouse click event handlers', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.onUploadClicked(new MouseEvent('click'));
    }).not.toThrow();
  });

  it('should check file input change event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.onUploadSettingsChanged(new Event('change', {}));
    }).not.toThrow();
  });

  it('should check file input uploadSettingsLabel mouse click event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.uploadSettingsLabel?.nativeElement.dispatchEvent(new MouseEvent('click'));
    }).not.toThrow();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.uploadSettingsLabel;
      readAll = component.inputGroupUploadSettings;
      readAll = component.defaultSettingsFileName;
      readAll = component.defaultSettingsFileExtension;
    }).not.toThrow();
  });

  it('should check the uploadSettingsChanged method and event', () => {
    expect(() => {
      let readAll;

      readAll = component.onUploadSettingsChanged(new Event('change', {}));

      readAll = debugComponent.uploadSettingsChanged();

      // tslint:disable-next-line: no-non-null-assertion
      const inputGroupUploadSettings = component.inputGroupUploadSettings?.nativeElement;
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);

      inputGroupUploadSettings!.files = ((files) => {
        const b = new ClipboardEvent('').clipboardData || new DataTransfer();
        for (let i = 0, len = files.length; i < len; i++) { b.items.add(files[i]); }
        return b.files;
      })([new File(['{ "test": true }'], 'test-settings-file.json', { type: 'application/json' })]);
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);

      component.uploadSettingsLabel = undefined;
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);
    }).not.toThrow();
  });

  it('should check the uploadSettings method', () => {
    expect(() => {
      const readAll = component.uploadSettings(new File(['{ "test": true }'], 'test-settings-file.json', { type: 'application/json' }));
    }).not.toThrow();
  });

  it('should replace the storage and reload after the settings file is read', async () => {
    const windowReload = vi.fn();
    component.uiService.windowReload = windowReload;
    component.uploadSettings(new File(['{"decorations":"true"}'], 'test-settings-file.json', { type: 'application/json' }));
    await vi.waitFor(() => expect(windowReload).toHaveBeenCalledTimes(1));
    expect(component.persistenceService.storage.getItem('decorations')).toBe('true');
  });
  it('should keep non-ASCII keys and values through a download and upload round trip', async () => {
    const key = '• Digital handyman 🚀';
    const storage = component.persistenceService.storage;
    storage.clear();
    storage.setItem(key, 'Café ✓');
    // the settings download link, as the browser saves it
    const url = component.settings as unknown as string;
    expect(url.startsWith('data:text/json;charset=utf-8,')).toBe(true);
    // saving the link writes its decoded text as UTF-8, as a File does with a string
    const file = new File([decodeURIComponent(url.slice(url.indexOf(',') + 1))], 'round-trip-settings.json', { type: 'application/json' });
    const windowReload = vi.fn();
    component.uiService.windowReload = windowReload;
    storage.clear();
    component.uploadSettings(file);
    await vi.waitFor(() => expect(windowReload).toHaveBeenCalledTimes(1));
    expect(storage.getItem(key)).toBe('Café ✓');
  });
  it('should check the updateStorage method', () => {
    expect(() => {
      const readAll = debugComponent.updateStorage({ test: true });
    }).not.toThrow();
  });

  it('should check the onUploadClicked method', () => {
    expect(() => {
      let readAll;

      readAll = component.onUploadClicked(new MouseEvent('click'));

      component.uploadSettingsLabel = undefined;
      readAll = component.onUploadClicked(new MouseEvent('click'));
    }).not.toThrow();
  });
});

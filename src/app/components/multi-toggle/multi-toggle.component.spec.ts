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
import { beforeEach, describe, expect, it } from 'vitest';
import { ChangeNotificationService } from '../../services/change-notification/change-notification.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { MultiToggleComponent } from './multi-toggle.component';

import { FormsModule } from '@angular/forms';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('MultiToggleComponent', () => {
  let component: MultiToggleComponent;
  let fixture: ComponentFixture<MultiToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        provideHttpClientTesting()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrow();
  });

  it('should simulate mouse click at decorated', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClick([
        component.clickableModeDecorated,
        component.tagCloudElement,
        component.chartElement,
        component.bothElement,
        component.tagCloudElement]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrow();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClick([
        component.clickableMode,
        component.clickableTagCloud,
        component.clickableChart,
        component.clickableBoth,
        component.clickableTagCloud]);
    }).not.toThrow();
  });

  it('should simulate mouse click using keyboard at decorated', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableModeDecorated,
        component.tagCloudElement,
        component.chartElement,
        component.bothElement,
        component.tagCloudElement]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrow();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableMode,
        component.clickableTagCloud,
        component.clickableChart,
        component.clickableBoth,
        component.clickableTagCloud]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrow();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.TagCloudDisplayMode;

      readAll = component.portfolioService;
      readAll = component.inputService;
      readAll = component.uiService;
      readAll = component.toggleService;
      readAll = component.sliderClass;
      readAll = component.radiosliderClass;
      component.context = component.context;
    }).not.toThrow();
  });
  const root = () => fixture.nativeElement as HTMLElement;
  const setSettings = (decorations: boolean, captions: boolean) => {
    component.portfolioService.toolbarService.persistenceService.setItem('decorations', decorations.toString());
    component.portfolioService.toolbarService.persistenceService.setItem('captions', captions.toString());
    TestBed.inject(ChangeNotificationService).settingsChanged$.next();
    fixture.detectChanges();
  };
  it('should apply the default radio slider class without a context', () => {
    setSettings(true, false);
    expect(component.radiosliderClass).toBe('radioslider');
    expect(root().querySelector('.radioslider')).toBeTruthy();
  });
  it('should apply the radio slider class of the context', () => {
    component.context = { radiosliderClass: 'radioslider-cyan' };
    setSettings(true, false);
    expect(component.radiosliderClass).toBe('radioslider-cyan');
    expect(root().querySelector('.radioslider-cyan')).toBeTruthy();
    expect(root().querySelector('.radioslider')).toBeFalsy();
  });
  it('should show glyph captions when decorations and captions are on', () => {
    setSettings(true, true);
    const captions = Array.from(root().querySelectorAll('label .caption')).map((_) => _.textContent?.trim());
    expect(captions).toEqual(['TC', 'C', 'B']);
  });
  it('should show no captions when decorations are on and captions are off', () => {
    setSettings(true, false);
    expect(root().querySelectorAll('label .caption').length).toBe(0);
    expect(root().querySelector('.toggle-option-slider')).toBeTruthy();
  });
  it('should show the plain text radio buttons when decorations are off', () => {
    setSettings(false, true);
    expect(root().querySelector('.toggle-option-slider')).toBeFalsy();
    expect(root().querySelectorAll('label.radio-inline').length).toBe(3);
    expect(root().querySelectorAll('.caption').length).toBe(0);
  });
  it('should refresh without a reload when the decorations or the captions setting changes', () => {
    setSettings(false, false);
    expect(root().querySelector('.radioslider')).toBeFalsy();
    setSettings(true, false);
    expect(root().querySelector('.radioslider')).toBeTruthy();
    setSettings(true, true);
    expect(root().querySelectorAll('label .caption').length).toBe(3);
  });
});

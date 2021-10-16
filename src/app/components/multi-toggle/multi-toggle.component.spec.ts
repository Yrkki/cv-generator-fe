// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { MultiToggleComponent } from './multi-toggle.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('MultiToggleComponent', () => {
  let component: MultiToggleComponent;
  let fixture: ComponentFixture<MultiToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiToggleComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
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
    }).not.toThrowError();
  });

  it('should simulate mouse click at decorated', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClick([
        component.clickableModeDecorated,
        component.tagCloudElement,
        component.chartElement,
        component.bothElement,
        component.tagCloudElement,
      ]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClick([
        component.clickableMode,
        component.clickableTagCloud,
        component.clickableChart,
        component.clickableBoth,
        component.clickableTagCloud,
      ]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at decorated', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableModeDecorated,
        component.tagCloudElement,
        component.chartElement,
        component.bothElement,
        component.tagCloudElement,
      ]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;

      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableMode,
        component.clickableTagCloud,
        component.clickableChart,
        component.clickableBoth,
        component.clickableTagCloud,
      ]);

      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.TagCloudDisplayMode;

      readAll = component.portfolioService;
      readAll = component.inputService;
      readAll = component.uiService;
    }).not.toThrowError();
  });
});

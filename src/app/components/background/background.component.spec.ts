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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { BackgroundComponent } from './background.component';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;
  let debugComponent: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundComponent ],
      imports: [
        AppModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true } ));
    }).not.toThrowError();
  });

  it('should check restoreToggle event handler', () => {
    expect(() => {
      const typeName = 'Project Summary';
      const readAll = debugComponent.persistenceService.restoreToggle(document, typeName);
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;

      readAll = component.EducationComponent;
      readAll = component.PersonalDataComponent;
      readAll = component.ProfessionalExperienceComponent;

      readAll = component.frequenciesDivider;
      readAll = component.decorations;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);

      readAll = component.getInjector({});
      readAll = component.getInjector({}, 1);
    }).not.toThrowError();
  });
});

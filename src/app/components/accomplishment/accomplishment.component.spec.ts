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
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { AccomplishmentComponent } from './accomplishment.component';

import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('AccomplishmentComponent', () => {
  let component: AccomplishmentComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<AccomplishmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccomplishmentComponent],
      imports: [
        AppModule
      ]
    }).compileComponents();
    TestBed.inject(
      SorterServiceFactory.InjectionToken(SorterKind.Accomplishments,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    TestBed.inject(
      TruncatorServiceFactory.InjectionToken(TruncatorKind.Cv,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentComponent);
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
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true }));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check rotateClassifierKind', () => {
    expect(() => {
      const target = component.classifierKind?.nativeElement;
      if (target) {
        target.click();
        target.classList.add('classifier');
        target.click();
        target.classList.add('clickableClassifierKind');
        target.click();
        target.parentElement?.classList.add('clickableClassifierKind');
        target.click();
        target.parentElement?.parentElement?.classList.add('clickableClassifierKind');
        target.click();

        component.portfolioService.engine.model.portfolioModel.filtered.Accomplishments = [];
        target.click();
      }
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      component.accomplishmentType = component.accomplishmentType;
      readAll = component.filtered;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;

      readAll = component.classifierKind;

      readAll = component.ToggleKind;

      readAll = component.frequenciesDivider;
      readAll = component.cv;
      readAll = component.decorations;

      readAll = component.portfolioService;
      readAll = component.entitiesService;
      readAll = component.sorterService;
      readAll = component.truncatorService;
      readAll = component.inputService;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.componentOutletInjectorService;
      readAll = debugComponent.injector;
      readAll = debugComponent.persistenceService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      // inherited
      readAll = component.projectsDefined();

      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});

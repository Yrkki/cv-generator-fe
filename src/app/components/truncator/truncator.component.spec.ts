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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { TruncatorComponent } from './truncator.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Indexable } from '../../interfaces/indexable';

import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('TruncatorComponent', () => {
  let component: TruncatorComponent;
  let fixture: ComponentFixture<TruncatorComponent>;
  let debugComponent: any;

  const truncatorService: Indexable<TruncatorService> = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TruncatorComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
    TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) =>
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorServiceFactory.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      )));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatorComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    component.truncatorKind = TruncatorKind.Cv;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        debugComponent.truncatorService = service;
        TestingCommon.shouldSimulateMouseClick([
          component.clickableFocusThreshold,
          component.inputFocusThreshold,
          component.tagCloudEmphasisToggle.clickableToggle,
          component.tagCloudEmphasisToggle.inputToggle
        ]);
      }).not.toThrowError();
    });
  });

  it('should simulate mouse click using keyboard', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        debugComponent.truncatorService = service;
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([
          component.clickableFocusThreshold,
          component.inputFocusThreshold,
          component.tagCloudEmphasisToggle.clickableToggle,
          component.tagCloudEmphasisToggle.inputToggle
        ]);
      }).not.toThrowError();
    });
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface properties', () => {
    // eslint-disable-next-line max-lines-per-function
    Object.values(truncatorService).forEach((service) => {
      // eslint-disable-next-line max-lines-per-function
      expect(() => {
        debugComponent.truncatorService = service;

        let readAll;
        component.truncatorKind = component.truncatorKind;

        (TruncatorServiceFactory.TruncatorKindValues.concat(-1 as TruncatorKind)).forEach((truncatorKind) => {
          component.truncatorKind = truncatorKind;
          readAll = debugComponent.truncatorService;

          readAll = component.TruncatorKind;
          readAll = component.longTruncatorKind;

          component.context = component.context;

          readAll = component.ToggleKind;

          readAll = component.subContext.tagCloudEmphasisContext;
          readAll = component.subContext.tagCloudEmphasisContext.position;
          readAll = component.subContext.tagCloudEmphasisContext.value;
          readAll = component.subContext.tagCloudEmphasisContext.displayValue;
          readAll = component.subContext.tagCloudEmphasisContext.model;
          readAll = component.subContext.tagCloudEmphasisContext.subject;
          readAll = component.subContext.tagCloudEmphasisContext.propertyName;
          readAll = component.subContext.tagCloudEmphasisContext.sliderClass;
        });
      }).not.toThrowError();
    });
  });

  it('should check public interface context dependent properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        [component.context, component.subContext].forEach((_) => {
          readAll = _?.value;
          readAll = _?.displayValue;
          readAll = _?.model;
          readAll = _?.propertyName;
        });
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        debugComponent.truncatorService = service;

        // let readAll;
      }).not.toThrowError();
    });
  });
});

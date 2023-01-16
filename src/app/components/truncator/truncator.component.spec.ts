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

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
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
      });
      expect(component).toBeTruthy();
    });
  });

  it('should check focusThresholdContext public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      debugComponent.truncatorService = service;

      let readAll;
      component.truncatorKind = component.truncatorKind;

      (TruncatorServiceFactory.TruncatorKindValues.concat(-1 as TruncatorKind)).forEach((truncatorKind) => {
        component.truncatorKind = truncatorKind;
        if (debugComponent.truncatorService) {
          readAll = component.focusThresholdContext;

          readAll = component.focusThresholdContext.truncatorKind;
          readAll = component.focusThresholdContext.default;
          readAll = component.focusThresholdContext.persistenceName;
          readAll = component.focusThresholdContext.displayValue;
          readAll = component.focusThresholdContext.propertyName;

          readAll = component.focusThresholdContext.value;
          readAll = component.focusThresholdContext.model;
        }
      });
      expect(component).toBeTruthy();
    });
  });

  it('should check tagCloudEmphasisContext public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      debugComponent.truncatorService = service;

      let readAll;
      component.truncatorKind = component.truncatorKind;

      (TruncatorServiceFactory.TruncatorKindValues.concat(-1 as TruncatorKind)).forEach((truncatorKind) => {
        component.truncatorKind = truncatorKind;
        if (debugComponent.truncatorService) {
          readAll = component.tagCloudEmphasisContext;
          readAll = component.tagCloudEmphasisContext.position;
          readAll = component.tagCloudEmphasisContext.value;
          readAll = component.tagCloudEmphasisContext.displayValue;
          readAll = component.tagCloudEmphasisContext.model;
          readAll = component.tagCloudEmphasisContext.subject;
          readAll = component.tagCloudEmphasisContext.propertyName;
          readAll = component.tagCloudEmphasisContext.sliderClass;
        }
      });
      expect(component).toBeTruthy();
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

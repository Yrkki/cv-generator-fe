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

import { SorterComponent } from './sorter.component';
import { Go } from '../../enums/go.enum';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Indexable } from '../../interfaces/indexable';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('SorterComponent', () => {
  let component: SorterComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SorterComponent>;

  const sorterService: Indexable<SorterService> = {
    Accomplishments: {} as SorterService,
    Publications: {} as SorterService,
    Spectrum: {} as SorterService,
    Projects: {} as SorterService
  };

  let uiService: UiService;
  let persistenceService: PersistenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SorterComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
    SorterServiceFactory.SorterKindValues.forEach((sorterKind) =>
      sorterService[SorterKind[sorterKind]] = TestBed.inject(SorterServiceFactory.InjectionToken(sorterKind,
        uiService = TestBed.inject(UiService),
        persistenceService = TestBed.inject(PersistenceService)
      )));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  SorterServiceFactory.SorterKindValues.forEach((sorterKind) =>
    it('should initialize', () => {
      component.sorterKind = sorterKind;
      expect(() => { component.Initialize(); }).not.toThrowError();
    })
  );

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        debugComponent.truncatorService = service;
        TestingCommon.shouldSimulateMouseClick([component.clickableBack, component.clickableForward, component.clickableHome]);
      }).not.toThrowError();
    });
  });

  it('should simulate mouse click using keyboard', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        debugComponent.truncatorService = service;
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableBack, component.clickableForward, component.clickableHome]);
      }).not.toThrowError();
    });
  });

  it('should check public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        debugComponent.sorterService = service;
        let readAll;
        readAll = component.type;
        readAll = component.displayType;
        component.sorterKind = component.sorterKind;
        readAll = component.Go;
        readAll = component.subSortField;
        readAll = component.subSortField.sorterService;
        readAll = component.subSortField.sortFieldIndex;
        readAll = component.subSortField.sortOrder;
        readAll = component.subSortField.orderDirection;
        readAll = component.subSortField.orderDirection[service.sortOrder];
        readAll = component.subSortField.nextHome;
        readAll = component.subSortField.nextBack;
        readAll = component.subSortField.nextForward;
        component.subSortField.sortFieldIndex = component.subSortField.sortFieldIndex;
        component.subSortField.sortFieldIndex = 1;
        component.subSortField.sortOrder = component.subSortField.sortOrder;
      }).not.toThrowError();
    });
  });

  it('should check public interface properties when no sorterService', () => {
    expect(() => {
      debugComponent.sorterService = undefined;

      let readAll;
      readAll = component.subSortField;
      readAll = component.subSortField.sorterService;
      readAll = component.subSortField.sortFieldIndex;
      readAll = component.subSortField.sortOrder;
      component.subSortField.sortFieldIndex = component.subSortField.sortFieldIndex;
      component.subSortField.sortFieldIndex = 1;
      component.subSortField.sortOrder = component.subSortField.sortOrder;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        debugComponent.sorterService = service;

        let readAll;
        readAll = component.subSortField.sortField(1);
        readAll = component.subSortField.sortField(0);
        readAll = component.subSortField.sortField(-1);
        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          readAll = component.subSortField.nextSort(new MouseEvent('click'), _);
          readAll = component.subSortField.nextSortTitle(_);
        });
        readAll = component.subSortField.sorted([]);
      }).not.toThrowError();
    });
  });

  it('should check public interface methods when no sorterService', () => {
    expect(() => {
      debugComponent.sorterService = undefined;

      let readAll;
      readAll = component.subSortField.sortField(1);
      readAll = component.subSortField.sortField(0);
      readAll = component.subSortField.sortField(-1);
      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = component.subSortField.nextSortTitle(_);
      });
    }).not.toThrowError();
  });
});

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

import { ClassifierComponent } from './classifier.component';
import { Go } from '../../enums/go.enum';

import { Entity } from '../../interfaces/entities/entity';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClassifierService } from '../../services/classifier/classifier.service';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('ClassifierComponent', () => {
  let component: ClassifierComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<ClassifierComponent>;
  let classifierService: ClassifierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassifierComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifierComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    classifierService = TestBed.inject(ClassifierService);
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

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickableBack, component.clickableForward, component.clickableHome]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableBack, component.clickableForward, component.clickableHome]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      component.type = component.type;

      readAll = component.displayType;
      component.portfolioService.model.portfolioModel.entities[component.type] = {} as Entity;
      readAll = component.displayType;

      readAll = component.Go;

      readAll = component.classifierService;
      readAll = component.portfolioService;
      readAll = component.inputService;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check subComponent public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.subComponent;
      component.subComponent.classifierService = component.subComponent.classifierService;
      component.subComponent.portfolioService = component.subComponent.portfolioService;
      readAll = component.subComponent.subService;
      readAll = component.subComponent.displayValue;
      readAll = component.subComponent.nextHome;
      readAll = component.subComponent.nextBack;
      readAll = component.subComponent.nextForward;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = component.subComponent.next(new MouseEvent('click'), _);
        readAll = component.subComponent.nextTitle(_);
      });
    }).not.toThrowError();
  });
});

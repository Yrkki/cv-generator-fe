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

import { SelectorHeaderComponent } from './selector-header.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('SelectorHeaderComponent', () => {
  let component: SelectorHeaderComponent;
  let fixture: ComponentFixture<SelectorHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        SelectorHeaderComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorHeaderComponent);
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

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickable]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickable]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
      component.key = component.key;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});

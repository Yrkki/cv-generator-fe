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

import { ContextSwitcherComponent } from './context-switcher.component';
import { Context } from '../../interfaces/context/context';
import { ContextConfiguration } from '../../interfaces/context/context-configuration';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('ContextSwitcherComponent', () => {
  let component: ContextSwitcherComponent;
  let fixture: ComponentFixture<ContextSwitcherComponent>;
  let debugComponent: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSwitcherComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
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
      TestingCommon.shouldSimulateMouseClick([component.sidenav, component.sidenav, component.sidenav]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.sidenav]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.NavState;
      readAll = component.contextService;
      component.contexts = component.contexts;
      readAll = component.inputService;
      component.isEditing = component.isEditing;
      component.navState = component.navState;
      readAll = component.navStateConfigurations;
      readAll = component.navStatePersistenceKey;
      readAll = component.persistenceService;
      component.selectedContext = component.selectedContext;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.Initialize();
      const context: Context = {
        id: 555,
        name: 'context name',
        storage: {} as Storage
      };
      readAll = component.getCaption(context);
      readAll = component.getTitle(context);
      readAll = component.toggleNavState();
      readAll = component.toggleNavState();

      readAll = component.toggleNav(new MouseEvent('empty'));
      readAll = debugComponent.stopEditing();

      component.isEditing = !component.isEditing;
      readAll = component.toggleNav(new MouseEvent('empty'));
      readAll = debugComponent.stopEditing();
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      const contextConfiguration: ContextConfiguration = {
        width: '10px',
        backgroundColor: 'blue',
        name: () => 'context switcher context configuration name'
      };
      component.navStateChanged.emit(contextConfiguration);
    }).not.toThrowError();
  });
});

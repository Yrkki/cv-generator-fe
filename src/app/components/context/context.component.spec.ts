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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextComponent } from './context.component';
import { Context } from '../../interfaces/context/context';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { HttpClientModule } from '@angular/common/http';
import { ContextService } from '../../services/context/context.service';
import { UiService } from '../../services/ui/ui.service';
import { InputService } from '../../services/input/input.service';
import { NavState } from '../../enums/nav-state';
import { ElementRef } from '@angular/core';

// eslint-disable-next-line max-lines-per-function
describe('ContextComponent', () => {
  let component: ContextComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<ContextComponent>;

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
    fixture = TestBed.createComponent(ContextComponent);
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
      TestingCommon.shouldSimulateMouseClick([component.clickableTab, component.input, component.clickableDelete]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableTab, component.input, component.clickableDelete]);
    }).not.toThrowError();
  });

  it('should test input logic', () => {
    expect(() => {
      component.clickableTab.nativeElement.click();
      if (component.input) {
        component.input.nativeElement.value = 'test context';
        component.input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    }).not.toThrowError();
  });

  it('should check onSelect', () => {
    expect(() => {
      debugComponent.tintedToggledSubscription = undefined;
      component.contextService.contextEquals = () => true;

      let readAll;
      const context: Context = { id: 555, name: 'context name', storage: {} as Storage };
      const context1: Context = { id: 111, name: 'context name 1', storage: {} as Storage };
      [NavState.Open, NavState.SemiOpen, NavState.Closed].forEach((navState) => {
        component.contextService.navState = navState;
        [false, true].forEach((isEditing) => {
          component.contextService.isEditing = isEditing;
          [context, context1].forEach((ctx) => {
            component.context = ctx;
            [undefined, new ElementRef(document.createElement('input'))].forEach((input) => {
              debugComponent.input = input;
              readAll = component.onSelect(new MouseEvent('click'), context);
              // readAll = debugComponent.changeContext(context);
              // readAll = debugComponent.focus();
            });
          });
        });
      });
    }).not.toThrowError();
  });

  it('should check newContext', () => {
    expect(() => {
      const context: Context = { id: 555, name: 'context name', storage: {} as Storage };
      debugComponent.tintedToggledSubscription = component.uiService.tintedToggled$.subscribe((_: boolean) => { });
      const readAll = debugComponent.changeContext(context);
    }).not.toThrowError();
  });

  it('should check newContext', () => {
    expect(() => {
      let readAll;

      [undefined,
        { id: 0, name: 'newName' } as Context,
        { id: 9, name: undefined },
        { id: 99, name: undefined, storage: undefined }
      ].forEach((_) => {
        component.contextService.selectedContext = _ as Context;
        if (_) { component.contextService.contexts.push(_ as Context); }

        const getItem = component.contextService.persistenceService.getItem;
        component.contextService.persistenceService.getItem = () => '0';
        readAll = debugComponent.newContext;
        component.contextService.persistenceService.getItem = getItem;
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.NavState;
      component.caption = component.caption;
      component.context = component.context;
      readAll = component.contextService;
      component.contextService.contexts = component.contextService.contexts;
      readAll = component.inputService;
      component.contextService.isEditing = component.contextService.isEditing;
      readAll = component.contextService.navState;
      component.contextService.selectedContext = component.contextService.selectedContext;
      component.title = component.title;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const context: Context = {
        id: 555,
        name: 'context name',
        storage: {} as Storage
      };
      readAll = component.contextService.contextEquals(context, context);
      readAll = component.onDelete(new MouseEvent('empty'));

      readAll = debugComponent.nextId();
      readAll = debugComponent.new();
      readAll = debugComponent.delete(new ContextComponent(
        TestBed.inject(ContextService),
        TestBed.inject(UiService),
        TestBed.inject(InputService))
      );

      debugComponent.tintedToggledSubscription = undefined;
      // tslint:disable-next-line: no-lifecycle-call
      readAll = component.ngOnDestroy();
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      const readAll = component.uiService.tintedToggled$.next(true);
    }).not.toThrowError();
  });
});

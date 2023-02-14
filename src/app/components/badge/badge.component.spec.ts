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
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { BadgeComponent } from './badge.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let debugComponent: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrowError(); });

  it('should check public interface properties', () => {
    let readAll;
    readAll = component.key;
    readAll = component.replacementMap;
    readAll = component.uiText('');

    debugComponent.replacementMap = debugComponent.replacementMap;
    expect(component).toBeTruthy();
  });

  it('should check public interface methods', () => {
    let readAll;
    ['not found', '', undefined].forEach((_) => {
      readAll = component.productionReady(_);
    });

    readAll = component.linkLabel('');
    readAll = component.uiText('');

    debugComponent.replacementMap = { version: 'version' };
    readAll = component.preprocessUrl('{{ qualifiedHostname }}');

    debugComponent.replacementMap = TestingCommon.chaosDecorateType(debugComponent.replacementMap);
    readAll = component.preprocessUrl('{{ qualifiedHostname }}');
    debugComponent.replacementMap = TestingCommon.chaosUndecorateType(debugComponent.replacementMap);

    readAll = debugComponent.replaceAll('undefined', 'test', 'test');
    expect(component).toBeTruthy();
  });
});

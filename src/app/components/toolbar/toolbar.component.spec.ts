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
/* eslint no-loop-func: "off" */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ToolbarComponent } from './toolbar.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToggleKind } from '../../enums/toggle-kind.enum';

// eslint-disable-next-line max-lines-per-function
describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
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
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;

    component.key = 'Curriculum Vitae';
    component.toggles = Object.values(ToggleKind).filter((_) => !isNaN(Number(_))) as ToggleKind[];

    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  for (let i = 0; i < 2; i++) {
    ((__) => {
      it('should simulate mouse click ' + __, () => {
        expect(() => {
          const toggles = [
            ...component.toggleComponents,
            component.tagCloudEmphasisTruncator?.tagCloudEmphasisToggle,
            // component.tagCloudDisplayModeMultiToggle.,
          ];
          TestingCommon.shouldSimulateMouseClick(toggles.map((_) => _.clickableToggle));
          TestingCommon.shouldSimulateMouseClick(toggles.map((_) => _.inputToggle));
        }).not.toThrowError();
      });

      it('should simulate mouse click using keyboard ' + __, () => {
        expect(() => {
          const toggles = [
            ...component.toggleComponents,
            component.tagCloudEmphasisTruncator?.tagCloudEmphasisToggle,
            // component.tagCloudDisplayModeMultiToggle.,
          ];
          TestingCommon.shouldSimulateMouseClickUsingKeyboard(toggles.map((_) => _.clickableToggle));
          TestingCommon.shouldSimulateMouseClickUsingKeyboard(toggles.map((_) => _.inputToggle));
        }).not.toThrowError();
      });
    })(i);
  }

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      readAll = component.toggles;
      ['', 'Curriculum Vitae', 'Project Summary', 'Project Portfolio'].forEach((_) => {
        component.key = _;
        readAll = component.truncatorKind;
      });
      readAll = component.ToggleKind;
      readAll = component.toolbarCollapsedToggleChecked;

      readAll = component.toggleClass;
      debugComponent.toolbarCollapsedToggle.inputToggle.nativeElement.checked = true;
      readAll = component.toggleClass;
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      component.instantSearchModelChanged.emit(true);
      component.responsiveModelChanged.emit({ sourceEntityKey: 'Language', value: true });
      component.tintedModelChanged.emit(true);
    }).not.toThrowError();
  });
});

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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { HeaderTitleComponent } from './header-title.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { Go } from '../../enums/go.enum';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { SorterComponent } from '../sorter/sorter.component';

// eslint-disable-next-line max-lines-per-function
describe('HeaderTitleComponent', () => {
  let component: HeaderTitleComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<HeaderTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTitleComponent],
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
    fixture = TestBed.createComponent(HeaderTitleComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    component.uiService.windowReload = TestingCommon.mockWindowReload;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should initialize', () => {
    expect(() => {
      const testSortElement = document.createElement('div');
      testSortElement.style.cursor = 'ponter';
      component.nextSortElement = testSortElement;

      component.Initialize();

      component.nextSortElement?.dispatchEvent(new Event('mouseenter'));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrowError(); });

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

  it('should check title', () => {
    expect(() => {
      let readAll;
      const testSortElement = document.createElement('div');
      testSortElement.style.cursor = 'ponter';
      [undefined, testSortElement].forEach((nextSortElement) => {
        component.nextSortElement = nextSortElement;
        ['Country', 'Accomplishments'].forEach((_) => {
          component.key = _;
          [TagCloudDisplayMode.tagCloud, TagCloudDisplayMode.chart].forEach((tagCloudDisplayMode) => {
            debugComponent.portfolioService.toolbarService = tagCloudDisplayMode;
            readAll = debugComponent.title;
          });
        });
      });
    }).not.toThrowError();
  });

  it('should check nextSort', () => {
    expect(() => {
      let readAll;
      [TagCloudDisplayMode.tagCloud, TagCloudDisplayMode.chart].forEach((tagCloudDisplayMode) => {
        debugComponent.portfolioService.toolbarService = tagCloudDisplayMode;
        readAll = debugComponent.nextSort(new MouseEvent('click'));
        readAll = debugComponent.nextSort(new MouseEvent('click'), Go.Back);
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.entities;
      readAll = component.entity;

      readAll = component.key;
      readAll = component.nextSortElement;

      readAll = component.sorterKind;
      component.key = 'test';
      readAll = component.sorterKind;

      readAll = component.count;

      readAll = component.clickable;
      readAll = component.sorter;
    }).not.toThrowError();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface methods', () => {
    // eslint-disable-next-line max-lines-per-function
    expect(() => {
      let readAll;

      [undefined, {
        subSortField: {
          nextSort: (event: MouseEvent, go = Go.Forward) => { },
          nextSortTitle: () => { }
        }
        // eslint-disable-next-line max-lines-per-function
      } as SorterComponent].forEach((sorter) => {
        component.sorter = sorter;

        const testSortElement = document.createElement('div');
        testSortElement.style.cursor = 'ponter';
        [undefined, testSortElement].forEach((nextSortElement) => {
          component.nextSortElement = nextSortElement;

          ['Country', 'Accomplishments'].forEach((_) => {
            component.key = _;

            component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.tagCloud;
            readAll = debugComponent.nextSort(new MouseEvent('click'));
            readAll = debugComponent.nextSort(new MouseEvent('click'), Go.Back);

            [undefined, {}].forEach((nextSortTitle) => {
              if (sorter) { (sorter.subSortField as any).nextSortTitle = () => nextSortTitle; }
              readAll = debugComponent.nextSortTitle();
              readAll = debugComponent.nextSortTitle(Go.Back);

              component.nextSortElement?.dispatchEvent(new Event('mouseenter'));
            });
          });
        });
      });
    }).not.toThrowError();
  });
});

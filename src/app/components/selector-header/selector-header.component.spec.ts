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

import { SelectorHeaderComponent } from './selector-header.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { Component, DebugElement, } from '@angular/core';
import { By } from '@angular/platform-browser';

// eslint-disable-next-line max-lines-per-function
describe('SelectorHeaderComponent', () => {
  @Component({
  standalone: false,
    selector: 'app-test-host',
    template: `<app-selector-header>
                  <span (click)="onClick($event)"><app-category><span><span>category<span></span></span></span></app-category></span>
                </app-selector-header>`
  })
  class TestContentComponent {
    onClick(event: MouseEvent) {
      ensureSiblingsAndProcess(event.target as HTMLElement);
    }
  }

  let component: SelectorHeaderComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SelectorHeaderComponent>;

  const process = (element: HTMLElement) => {
    let readAll;

    [true, false].forEach((editMode) => {
      component.persistenceService.setItem('edit mode', editMode.toString());
      debugComponent.changeDetector.detectChanges();

      [true, false].forEach((inline) => {
        component.inline = inline;

        element.click();
        component.onClick(new MouseEvent('click'));

        readAll = component.divider;

        readAll = debugComponent.useDivider(element);

        const useDivider = debugComponent.useDivider;
        readAll = debugComponent.dividerPresent;
        debugComponent.useDivider = (e: Element) => { return false; };
        readAll = debugComponent.dividerPresent;
        debugComponent.useDivider = useDivider;
      });
    });
  };

  const ensureSiblingsAndProcess = (element: HTMLElement) => {
    if (!element.click) { return; }

    process(element);

    const cloneCollapsed = element.cloneNode(true);
    (cloneCollapsed as HTMLElement).classList.add('collapsed');
    element.parentElement?.appendChild(cloneCollapsed);
    process(element);

    const cloneShown = element.cloneNode(true);
    (cloneShown as HTMLElement).classList.remove('collapsed');
    element.parentElement?.appendChild(cloneShown);
    process(element);
  };

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

  it('should test content', () => {
    expect(() => {
      const testContentComponentFixture = TestBed.createComponent(TestContentComponent);
      testContentComponentFixture.detectChanges();
      let debugElement = testContentComponentFixture.debugElement;
      const spans: Array<DebugElement> = [];
      for (let level = 0; level < 4; level++) {
        debugElement = debugElement.query(By.css('span'));
        spans.push(debugElement);
      }
      ['', 'id 1'].forEach((i) => {
        (spans[0].nativeElement as HTMLElement).id = i;
        ['', 'id 2'].forEach((j) => {
          (spans[1].nativeElement as HTMLElement).id = j;
          ['', 'id 3'].forEach((k) => {
            (spans[2].nativeElement as HTMLElement).id = k;
            ['', 'id 4'].forEach((l) => {
              (spans[3].nativeElement as HTMLElement).id = l;
              spans.forEach((span) => (span.nativeElement as HTMLElement)?.click());
            });
          });
        });
      });
    }).not.toThrowError();
  });

  it('should test category content', () => {
    expect(() => {
      const testContentComponentFixture = TestBed.createComponent(TestContentComponent);
      testContentComponentFixture.detectChanges();

      testContentComponentFixture.debugElement.nativeElement.querySelector('APP-CATEGORY')
        .firstElementChild.firstElementChild.firstElementChild.click();
    }).not.toThrowError();
  });

  it('should check real-life interaction', () => {
    expect(() => {
      ensureSiblingsAndProcess(component.clickable?.nativeElement || {} as HTMLElement);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = component.divider;

      component.key = component.key;
      component.inline = component.inline;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      const readAll = debugComponent.dividerPresent;
    }).not.toThrowError();
  });

  it('should check private interface methods', () => {
    expect(() => {
      let readAll;

      readAll = debugComponent.useDivider({ parentElement: {} as Element } as Element);
      readAll = debugComponent.useDivider({} as Element);

      readAll = debugComponent.notCollapsed({} as Element);
    }).not.toThrowError();
  });

  it('should check ngAfterContentChecked lifecycle hook', () => {
    expect(() => {
      // tslint:disable-next-line: no-lifecycle-call
      component.ngAfterContentChecked();
    }).not.toThrowError();
  });
});

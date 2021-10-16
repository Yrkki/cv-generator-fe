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
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SearchComponent } from './search.component';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { AppModule } from '../../app.module';

import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('SearchComponent', () => {
  let component: SearchComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        SearchComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    debugComponent = fixture.debugElement.componentInstance;
    debugComponent.uiService.windowReload = TestingCommon.mockWindowReload;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for data', () => {
    expect(() => {
      component.SearchToken = 'kon or bul';
    }).not.toThrowError();
  });

  it('should clear search', () => {
    expect(() => {
      component.clearSearch();
    }).not.toThrowError();
  });

  it('should handle field change', () => {
    expect(() => {
      [true, false].forEach((_) => {
        component.InstantSearch = _;
        component.onFieldChange('test query');
      });
    }).not.toThrowError();
  });

  it('should handle Instant search toggled', () => {
    expect(() => {
      component.onInstantSearchToggled(true);
      component.onInstantSearchToggled(false);
    }).not.toThrowError();
  });

  it('should start all over', () => {
    expect(() => {
      component.startAllOver();
    }).not.toThrowError();
  });

  it('should subscribe to instant search', () => {
    expect(() => {
      debugComponent.instantSearchSubscribe();
    }).not.toThrowError();
  });

  it('should check debounced subscription', () => {
    expect(() => {
      debugComponent.instantSearchSubscriptionDebounced(of('kon'));
    }).not.toThrowError();
  });

  it('should unsubscribe from instant search', () => {
    expect(() => {
      debugComponent.instantSearchUnsubscribe();
    }).not.toThrowError();
  });

  it('should do search', () => {
    expect(() => {
      component.search();
    }).not.toThrowError();
  });

  it('should test instant search subscription', () => {
    expect(() => {
      debugComponent.searchFieldEntryDebounceTime = 1;
      debugComponent.instantSearchUnsubscribe();
      debugComponent.instantSearchSubscribe();
      debugComponent.searchTokenChanged$.next('emitted');
      debugComponent.instantSearchUnsubscribe();
    }).not.toThrowError();
  });

  it('should use instant search', () => {
    expect(() => {
      component.InstantSearch = component.InstantSearch;
    }).not.toThrowError();
  });

  it('should accept Enter key', () => {
    expect(() => {
      component.InstantSearch = false;
      const searchTextElement = component.searchTextElement;
      if (searchTextElement) {
        searchTextElement.nativeElement.value = 'kon';
        const event = new KeyboardEvent('keydown', {
          code: 'Enter'
        });
        searchTextElement.nativeElement.dispatchEvent(event);
      }
    }).not.toThrowError();
  });

  it('should accept Shift-Delete keys', () => {
    expect(() => {
      component.InstantSearch = false;
      const searchTextElement = component.searchTextElement;
      if (searchTextElement) {
        searchTextElement.nativeElement.value = 'kon';
        const event = new KeyboardEvent('keydown', {
          code: 'Delete',
          shiftKey: true
        });
        searchTextElement.nativeElement.dispatchEvent(event);
      }
    }).not.toThrowError();
  });

  it('should accept Ctrl-Delete keys', () => {
    expect(() => {
      component.InstantSearch = false;
      const searchTextElement = component.searchTextElement;
      if (searchTextElement) {
        searchTextElement.nativeElement.value = 'kon';
        const event = new KeyboardEvent('keydown', {
          code: 'Delete',
          ctrlKey: true
        });
        searchTextElement.nativeElement.dispatchEvent(event);
      }
    }).not.toThrowError();
  });

  it('should process keydown', () => {
    expect(() => {
      ['Enter', 'Delete'].forEach((key) => {
        [true, false].forEach((shiftKey) => {
          [true, false].forEach((ctrlKey) => {
            component.keydown(new KeyboardEvent('keydown', { key, shiftKey, ctrlKey }));
          });
        });
      });

      component.keydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      component.keydown(new KeyboardEvent('keydown', { key: 'Delete', ctrlKey: true }));
      component.searchHistoryService.newSearchTokenSuggestion = component.SearchToken + 'X';
      component.keydown(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true }));
    }).not.toThrowError();
  });

  it('should process keydown enter', () => {
    expect(() => {
      ['Enter', 'Delete'].forEach((key) => {
        [true, false].forEach((shiftKey) => {
          [true, false].forEach((ctrlKey) => {
            debugComponent.processKeydownEnter(new KeyboardEvent('keydown', { key, shiftKey, ctrlKey }));
          });
        });
      });
    }).not.toThrowError();
  });

  it('should process keydown delete', () => {
    expect(() => {
      ['Enter', 'Delete'].forEach((key) => {
        [true, false].forEach((shiftKey) => {
          [true, false].forEach((ctrlKey) => {
            debugComponent.processKeydownDelete(new KeyboardEvent('keydown', { key, shiftKey, ctrlKey }));
          });
        });
      });
    }).not.toThrowError();
  });

  it('should test more complex search logic', () => {
    expect(() => {
      component.InstantSearch = false;
      const searchTextElement = component.searchTextElement;
      if (searchTextElement) {
        searchTextElement.nativeElement.value = 'norway -desktop or austria';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

        searchTextElement.nativeElement.value = '-desktop norway or austria';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

        searchTextElement.nativeElement.value = ' ';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    }).not.toThrowError();
  });

  it('should label elements', () => {
    expect(() => {
      component.label('element');
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      // tslint:disable-next-line: no-non-null-assertion
      const instantSearchToggle = component.toolbar.toggleComponents.find((_) => _.toggleKind === ToggleKind.InstantSearch)!;
      TestingCommon.shouldSimulateMouseClick([
        component.clickableSearch,
        component.clickableClearSearch,
        component.clickableStartAllOver,
        instantSearchToggle.clickableToggle,
        instantSearchToggle.inputToggle
      ]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      // tslint:disable-next-line: no-non-null-assertion
      const instantSearchToggle = component.toolbar.toggleComponents.find((_) => _.toggleKind === ToggleKind.InstantSearch)!;
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableSearch,
        component.clickableClearSearch,
        component.clickableStartAllOver,
        instantSearchToggle.clickableToggle,
        instantSearchToggle.inputToggle
      ]);
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.ToggleKind;
      readAll = component.toolbar;

      readAll = component.decorations;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const instantSearch = component.InstantSearch;
      component.InstantSearch = instantSearch;
    }).not.toThrowError();
  });
});

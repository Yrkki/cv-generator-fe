/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SearchComponent } from './search.component';

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
    })
      .compileComponents();
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
      component.onFieldChange('test query');
    }).not.toThrowError();
  });

  it('should handle Instant search toggled', () => {
    expect(() => {
      component.onInstantSearchToggled(true);
      component.onInstantSearchToggled(false);
    }).not.toThrowError();
  });

  it('should reload window', () => {
    expect(() => {
      debugComponent.windowReload();
    }).not.toThrowError();
  });

  it('should start all over', () => {
    expect(() => {
      component.startAllOver();
    }).not.toThrowError();
  });

  it('should subscribe to instant search', () => {
    expect(() => {
      component.instantSearchSubscribe();
    }).not.toThrowError();
  });

  it('should unsubscribe from instant search', () => {
    expect(() => {
      component.instantSearchUnsubscribe();
    }).not.toThrowError();
  });

  it('should do search', () => {
    expect(() => {
      component.search();
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
      component.keydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      component.keydown(new KeyboardEvent('keydown', { key: 'Delete', shiftKey: true }));
      component.keydown(new KeyboardEvent('keydown', { key: 'Delete', ctrlKey: true }));
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
      TestingCommon.shouldSimulateMouseClick([
        component.clickableSearch,
        component.clickableClearSearch,
        component.clickableStartAllOver,
        component.toolbar.instantSearchToggle.clickableToggle,
        component.toolbar.instantSearchToggle.inputToggle
      ]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([
        component.clickableSearch,
        component.clickableClearSearch,
        component.clickableStartAllOver,
        component.toolbar.instantSearchToggle.clickableToggle,
        component.toolbar.instantSearchToggle.inputToggle
      ]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.ToggleKind;
      readAll = component.toolbar;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const instantSearch = component.InstantSearch;
      component.InstantSearch = instantSearch;
    }).not.toThrowError();
  });
});

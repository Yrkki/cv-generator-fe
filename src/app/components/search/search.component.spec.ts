import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
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
    component = fixture.componentInstance;
    component.windowReload = () => {};
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

  it('should reload window', () => {
    expect(() => {
      component.windowReload();
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

  it('should test more complex search logic', () => {
    expect(() => {
      component.InstantSearch = false;
      const searchTextElement = component.searchTextElement;
      if (searchTextElement) {
        searchTextElement.nativeElement.value = 'norway -desktop or austria';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        searchTextElement.nativeElement.value = '-desktop norway or austria';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        searchTextElement.nativeElement.value = ' ';
        searchTextElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
      }
    }).not.toThrowError();
  });

  it('should label elements', () => {
    expect(() => {
      component.label('element');
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the search button', () => {
    expect(() => {
      component.clickableSearch?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the clear search button', () => {
    expect(() => {
      component.clickableClearSearch?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the start all over button', () => {
    expect(() => {
      component.clickableStartAllOver?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the instant search decorated button', () => {
    expect(() => {
      component.clickableInstantSearchDecorated?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the instant search button', () => {
    expect(() => {
      component.clickableInstantSearch?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});

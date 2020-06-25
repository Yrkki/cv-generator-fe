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
      component.searchToken = 'kon or bul';
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
      component.SearchTextElement.nativeElement.value = 'kon';
      const event = new KeyboardEvent('keypress', {
        code: 'Enter'
      });
      component.SearchTextElement.nativeElement.dispatchEvent(event);
    }).not.toThrowError();
  });

  it('should accept Shift-Delete keys', () => {
    expect(() => {
      component.InstantSearch = false;
      component.SearchTextElement.nativeElement.value = 'kon';
      const event = new KeyboardEvent('keypress', {
        code: 'Delete',
        shiftKey: true
      });
      component.SearchTextElement.nativeElement.dispatchEvent(event);
    }).not.toThrowError();
  });

  it('should accept Ctrl-Delete keys', () => {
    expect(() => {
      component.InstantSearch = false;
      component.SearchTextElement.nativeElement.value = 'kon';
      const event = new KeyboardEvent('keypress', {
        code: 'Delete',
        ctrlKey: true
      });
      component.SearchTextElement.nativeElement.dispatchEvent(event);
    }).not.toThrowError();
  });

  it('should label elements', () => {
    expect(() => {
      component.label('element');
    }).not.toThrowError();
  });
});

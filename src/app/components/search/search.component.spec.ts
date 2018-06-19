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
    component.windowReload = () => console.log('Mock window reload');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for data', () => {
    expect(() => {
      component.searchToken = 'kon';
    }).not.toThrowError();
  });

  it('should clear search', () => {
    expect(() => {
      component.clearSearch();
    }).not.toThrowError();
  });

  it('should start all over', () => {
    expect(() => {
      component.startAllOver();
    }).not.toThrowError();
  });
});

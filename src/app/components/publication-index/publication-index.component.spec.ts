import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { PublicationIndexComponent } from './publication-index.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('PublicationIndexComponent', () => {
  let component: PublicationIndexComponent;
  let fixture: ComponentFixture<PublicationIndexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        PublicationIndexComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationIndexComponent);
    component = fixture.componentInstance;
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

  it('should check public interface', () => {
    expect(() => {
      let readAll: any;
      readAll = component.frequency;
      readAll = component.getFrequenciesCache(component.key);
      readAll = component.frequenciesDivider;
      readAll = component.SearchToken;
      component.SearchToken = 'test';

      readAll = component.getFrequencyStyle(
        [
          'test frequency',
          {
            'Count': 1,
            'Percentage': 100,
            'Lightness': 0,
            'Size': 16,
            'Weight': 400,
            get Label() { return ''; }
          }
        ]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});

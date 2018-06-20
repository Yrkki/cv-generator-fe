import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTimelineComponent } from './general-timeline.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('GeneralTimelineComponent', () => {
  let component: GeneralTimelineComponent;
  let fixture: ComponentFixture<GeneralTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        GeneralTimelineComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter results', () => {
    expect(() => {
      component.portfolioComponent.searchToken = 'kon';
    }).not.toThrowError();
  });
});

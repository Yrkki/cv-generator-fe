import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { GeneralTimelineComponent } from './general-timeline.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

describe('GeneralTimelineComponent', () => {
  let component: GeneralTimelineComponent;
  let fixture: ComponentFixture<GeneralTimelineComponent>;
  let portfolioService: PortfolioService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        GeneralTimelineComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioService = TestBed.inject(PortfolioService);
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
      portfolioService.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      component.drawGeneralTimeline();
      readAll = component.filtered;
      readAll = component.filtered.Accomplishments;
      readAll = component.filtered.Projects;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.generalTimelineDefined();
      readAll = component.tabName('');
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { MockDataService } from '../../services/mock-data/mock-data.service';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let mockDataService: MockDataService;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        PortfolioComponent,
        MockDataService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    mockDataService = new MockDataService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process a search query', () => {
    component.searchToken = 'qwerty "asdf fdsa" or \'zxcvb\'';
    const count = component.filteredProjects.length;

    expect(count).toBeDefined();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
  });

  it('should search for data', () => {
    expect(() => {
      component.LoadData(mockDataService);
      component.searchToken = 'kon';
    }).not.toThrowError();
  });

  it('should test all charts', () => {
    expect(() => {
      component.LoadData(mockDataService);
      component.tagCloud = component.tagCloudDisplayMode.tagCloud;
      component.tagCloud = component.tagCloudDisplayMode.chart;
      component.tagCloud = component.tagCloudDisplayMode.both;
      component.tagCloud = component.tagCloudDisplayMode.tagCloud;
      component.tagCloud = component.tagCloudDisplayMode.both;
      component.tagCloud = component.tagCloudDisplayMode.chart;
      component.tagCloud = component.tagCloudDisplayMode.tagCloud;
    }).not.toThrowError();
  });

  it('should toggle decorations', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.decorations;
      component.decorationsElement?.nativeElement?.click();
      component.decorationsElement?.nativeElement?.click();
      component.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.tagCloud;
      component.tagCloudElement?.nativeElement?.click();
      component.chartElement?.nativeElement?.click();
      component.bothElement?.nativeElement?.click();
      component.tagCloud = value;
    }).not.toThrowError();
  });

  it('should check ui', () => { expect(() => { const readAll = component.ui; }).not.toThrowError(); });
  it('should check entities', () => { expect(() => { const readAll = component.entities; }).not.toThrowError(); });
  it('should check cv', () => { expect(() => { const readAll = component.cv; }).not.toThrowError(); });
  it('should check projects', () => { expect(() => { const readAll = component.projects; }).not.toThrowError(); });

  it('should check nonBreakingSpace', () => { expect(() => { const readAll = component.nonBreakingSpace; }).not.toThrowError(); });

  it('should check dateFormatShort', () => { expect(() => { const readAll = component.dateFormatShort; }).not.toThrowError(); });
  it('should check dateFormatMiddle', () => { expect(() => { const readAll = component.dateFormatMiddle; }).not.toThrowError(); });
  it('should check dateFormatLong', () => { expect(() => { const readAll = component.dateFormatLong; }).not.toThrowError(); });
  it('should check dateFormatShorter', () => { expect(() => { const readAll = component.dateFormatShorter; }).not.toThrowError(); });
  it('should check dateFormatLonger', () => { expect(() => { const readAll = component.dateFormatLonger; }).not.toThrowError(); });

  it('should check isEmpty', () => { expect(() => { const readAll = component.isEmpty({}); }).not.toThrowError(); });
  it('should check getAssetUri', () => { expect(() => { const readAll = component.getAssetUri(''); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = component.linkLabel(''); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = component.label(''); }).not.toThrowError(); });
  it('should check projectsAccomplishmentClassList', () => { expect(() => { const readAll = component.projectsAccomplishmentClassList; }).not.toThrowError(); });
  // ...

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.tagCloudElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.chartElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.bothElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableCurriculumVitae.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableDecorationsDecorated.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableDecorations.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableGanttChartMap.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableProjectSummary.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableModeDecorated.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableMode.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableTagCloud.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableChart.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableBoth.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableTagCloud.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableChart.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableBoth.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableProjectPortfolio.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableGoToTop.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { HttpClient } from '@angular/common/http';
import { Indexable } from '../../classes/indexable';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  // let httpTestingController: HttpTestingController;
  let mockDataService: MockDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
        // HttpClientTestingModule
      ],
      providers: [
        PortfolioComponent,
        HttpClient
      ]
    }).compileComponents();
    // httpTestingController = TestBed.inject(HttpTestingController);
    mockDataService = TestBed.inject(MockDataService);
  }));

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process a search query', () => {
    component.SearchToken = 'qwerty "asdf fdsa" or \'zxcvb\'';
    const count = component.filteredProjects.length;

    expect(count).toBeDefined();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
  });

  it('should search for data', () => {
    expect(() => {
      component.LoadData(mockDataService);
      component.SearchToken = 'kon';
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

  it('should check dateFormatShort', () => { expect(() => { const readAll = component.dateFormatShort; }).not.toThrowError(); });
  it('should check dateFormatMiddle', () => { expect(() => { const readAll = component.dateFormatMiddle; }).not.toThrowError(); });
  it('should check dateFormatLong', () => { expect(() => { const readAll = component.dateFormatLong; }).not.toThrowError(); });
  it('should check dateFormatShorter', () => { expect(() => { const readAll = component.dateFormatShorter; }).not.toThrowError(); });
  it('should check dateFormatLonger', () => { expect(() => { const readAll = component.dateFormatLonger; }).not.toThrowError(); });

  it('should check isEmpty', () => { expect(() => { const readAll = component.isEmpty({}); }).not.toThrowError(); });
  it('should check getAssetUri', () => { expect(() => { const readAll = component.getAssetUri(''); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = component.linkLabel(''); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = component.label(''); }).not.toThrowError(); });
  it('should check projectsAccomplishmentClassList',
    () => { expect(() => { const readAll = component.projectsAccomplishmentClassList; }).not.toThrowError(); });
  // ...

  it('should simulate mouse click using keyboard at the link to this symbol button', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the decorations button', () => {
    expect(() => {
      component.clickableDecorationsDecorated?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableDecorations?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the mode buttons', () => {
    expect(() => {
      component.clickableModeDecorated?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.tagCloudElement?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.chartElement?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.bothElement?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableMode?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableTagCloud?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableChart?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableBoth?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the Curriculum Vitae button', () => {
    expect(() => {
      component.clickableCurriculumVitae?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the Gantt chart button', () => {
    expect(() => {
      component.clickableGanttChartMap?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the project summary button', () => {
    expect(() => {
      component.clickableProjectSummary?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the project portfolio button', () => {
    expect(() => {
      component.clickableProjectPortfolio?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the go to top button', () => {
    expect(() => {
      component.clickableGoToTop?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should load', () => {
    expect(() => {
      component.LoadData(undefined);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;

      component.decorations = true;
      readAll = component.dateFormatShorter;
      readAll = component.dateFormatLonger;

      component.decorations = false;
      readAll = component.dateFormatShorter;
      readAll = component.dateFormatLonger;

      component.cv = component.cv;
      component.entities = component.entities;
      component.ui = component.ui;
      component.projects = component.projects;
      component.chartLoaded = component.chartLoaded;
      component.countCache = component.countCache;
      component.filteredProfessionalExperience = component.filteredProfessionalExperience;
      component.filteredEducation = component.filteredEducation;
      component.filteredCertifications = component.filteredCertifications;
      component.filteredAccomplishments = component.filteredAccomplishments;
      component.filteredPublications = component.filteredPublications;
      component.filteredProjects = component.filteredProjects;
      component.countCache = component.countCache;
      component.countCache = component.countCache;
      readAll = component.tagCloud;
      readAll = component.projectsAccomplishmentClassList;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.trackByFn(0, 0);
      readAll = component.generalTimelineDefined();
      readAll = component.updateShouldCollapseProjectsAccomplishment('Accomplishments');
      readAll = component.goToTop();
    }).not.toThrowError();
  });

  it('should check restoreToggle', () => {
    expect(() => {
      let readAll;
      const typeName = 'Accomplishments';
      readAll = component.restoreToggle(document, typeName);
    }).not.toThrowError();
  });

  it('should check count', () => {
    expect(() => {
      let readAll;
      readAll = component.count(component.cv['Personal data'], 'Personal data', '~');
      readAll = component.count(component.cv['Personal data'], 'Personal data');
      readAll = component.count(new Array<Indexable>(), 'Personal data');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      readAll = component.getSafeUri('');

      const searchText = component?.ui?.Search;
      if (searchText) { searchText.text = searchText.text === 'Search' ? 'EncryptedSearch' : 'Search'; }
      readAll = component.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check updateShouldCollapseProjectsAccomplishmentHandler handler', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishmentHandler(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;
      readAll = component.linkLabel(undefined);

      readAll = component.count(new Array<Indexable>(), 'test');

      const typeName = 'Accomplishments';
      readAll = component.restoreToggle(document, 'test');

      readAll = component.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { HttpClient } from '@angular/common/http';
import { Indexable } from '../../classes/indexable';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { Project } from '../../classes/project/project';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<PortfolioComponent>;
  // let httpTestingController: HttpTestingController;
  let mockDataService: MockDataService;

  beforeEach(waitForAsync(() => {
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
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process a search query', () => {
    fixture.debugElement.componentInstance.portfolioService.SearchToken = 'qwerty "asdf fdsa" or \'zxcvb\'';
    const count = component.portfolioService.filtered.Projects.length;

    expect(count).toBeDefined();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
  });

  it('should search for data', () => {
    expect(() => {
      component.LoadData(mockDataService);
      fixture.debugElement.componentInstance.portfolioService.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should toggle decorations', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.decorations;
      component.portfolioService.decorations = true;
      component.portfolioService.decorations = false;
      component.portfolioService.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.tagCloud;
      component.portfolioService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.tagCloud = TagCloudDisplayMode.chart;
      component.portfolioService.tagCloud = TagCloudDisplayMode.both;
      component.portfolioService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.tagCloud = TagCloudDisplayMode.both;
      component.portfolioService.tagCloud = TagCloudDisplayMode.chart;
      component.portfolioService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should toggle decorations', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.decorations;
      component.decorationsElement?.nativeElement?.click();
      component.decorationsElement?.nativeElement?.click();
      component.portfolioService.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.tagCloud;
      component.tagCloudElement?.nativeElement?.click();
      component.chartElement?.nativeElement?.click();
      component.bothElement?.nativeElement?.click();
      component.portfolioService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should check ui', () => { expect(() => { component.portfolioService.ui = component.portfolioService.ui; }).not.toThrowError(); });
  it('should check entities', () => {
    expect(() => { component.portfolioService.entities = component.portfolioService.entities; }).not.toThrowError();
  });
  it('should check cv', () => { expect(() => { component.portfolioService.cv = component.portfolioService.cv; }).not.toThrowError(); });
  it('should check projects', () => {
    expect(() => { component.portfolioService.projects = component.portfolioService.projects; }).not.toThrowError();
  });

  it('should check getAssetUri', () => { expect(() => { const readAll = component.uiService.getAssetUri(''); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = component.uiService.linkLabel(''); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = component.uiService.label(''); }).not.toThrowError(); });
  it('should check projectsAccomplishmentClassList',
    () => { expect(() => { const readAll = component.accomplishmentsService.projectsAccomplishmentClassList; }).not.toThrowError(); });
  // ...

  it('should simulate mouse click using keyboard at the link to this symbol button', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the extra-functions controls', () => {
    expect(() => {
      component.clickableToggleDecorated?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableToggle?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));

      component.clickableFocusThreshold?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
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
      component.LoadData();
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.componentName;

      readAll = component.uiService.linkToThisSymbol;
      readAll = component.uiService.linkToThisText;
      readAll = component.accomplishmentsService.projectsAccomplishmentClassList;

      component.portfolioService.countCache = component.portfolioService.countCache;

      component.portfolioService.filtered.Accomplishments = component.portfolioService.filtered.Accomplishments;
      component.portfolioService.filtered.Education = component.portfolioService.filtered.Education;
      component.portfolioService.filtered.ProfessionalExperience = component.portfolioService.filtered.ProfessionalExperience;
      component.portfolioService.filtered.Projects = component.portfolioService.filtered.Projects;
      component.portfolioService.filtered.Publications = component.portfolioService.filtered.Publications;

      component.decorations = component.decorations;
      component.pagination = component.pagination;
      component.CvTagCloudEmphasis = component.CvTagCloudEmphasis;
      component.PsTagCloudEmphasis = component.PsTagCloudEmphasis;
      component.PpTagCloudEmphasis = component.PpTagCloudEmphasis;
      component.CvFocusThreshold = component.CvFocusThreshold;
      component.PsFocusThreshold = component.PsFocusThreshold;
      component.PpFocusThreshold = component.PpFocusThreshold;

      component.columnsToggles = component.columnsToggles;
      component.toggle = component.toggle;

      readAll = component.portfolioService.filtered;
      readAll = component.portfolioService.filtered.Certifications;
      readAll = component.portfolioService.filtered.Languages;
      readAll = component.portfolioService.filtered.Courses;
      readAll = component.portfolioService.filtered.Organizations;
      readAll = component.portfolioService.filtered.Volunteering;
      readAll = component.portfolioService.filtered.Vacation;
      readAll = component.TagCloudDisplayMode;
    }).not.toThrowError();
  });

  it('should check public ui service interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.tabName('key');
      [false, true, undefined].forEach(_ => readAll = component.uiService.getProjectProjectImageUri('', _));
      readAll = component.uiService.getBackgroundLogoImageUri('');
      readAll = component.uiService.isEmptyProjectProjectImage(debugComponent.placeholderImageName);
      readAll = component.uiService.isEmptyProjectProjectImage('no ' + debugComponent.placeholderImageName);
    }).not.toThrowError();
  });

  it('should check public document service interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.documentService.goToTop();
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.portfolioService.generalTimelineDefined();

      readAll = component.portfolioService.getProjectIsOnePersonTeam(new Project());
      readAll = component.portfolioService.getProjectStartsNewPeriod(new Project());
      readAll = component.portfolioService.getDecryptedProjectPeriod(new Project());

      const propertyName = 'Responsibilities';
      readAll = component.portfolioService.getFrequenciesCache(propertyName);
      readAll = component.portfolioService.checkToggleCollapsed(propertyName);
      readAll = component.portfolioService.updateSearchToken('kon');
    }).not.toThrowError();
  });

  it('should check count', () => {
    expect(() => {
      let readAll;
      readAll = component.entitiesService.count(component.portfolioService.cv['Personal data'], 'Personal data', '~');
      readAll = component.entitiesService.count(component.portfolioService.cv['Personal data'], 'Personal data');
      readAll = component.entitiesService.count(new Array<Indexable>(), 'Personal data');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.getSafeUri('');

      const searchText = component.uiService?.ui?.Search;
      if (searchText) { searchText.text = searchText.text === 'Search' ? 'EncryptedSearch' : 'Search'; }
      readAll = component.uiService.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.persistenceService.saveToggle(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.inputService.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.linkLabel(undefined);

      readAll = component.entitiesService.count(new Array<Indexable>(), 'test');
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      let readAll;
      readAll = component.replaceAll('undefined', 'test', 'test');
      readAll = component.replaceAll(undefined, 'test', 'test');
    }).not.toThrowError();
  });
});

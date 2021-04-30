/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { HttpClient } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { Project } from '../../classes/project/project';
import { EngineService } from '../../services/engine/engine.service';

// eslint-disable-next-line max-lines-per-function
describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<PortfolioComponent>;
  let mockDataService: MockDataService;

  // access search service
  let engine: EngineService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
      ],
      providers: [
        PortfolioComponent,
        HttpClient
      ]
    }).compileComponents();
    mockDataService = TestBed.inject(MockDataService);
    engine = TestBed.inject(EngineService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    component.uiService.windowReload = TestingCommon.mockWindowReload;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  // eslint-disable-next-line no-undef
  afterAll(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      TestingCommon.reportReloads();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should process a search query', () => {
    engine.searchService.SearchToken = 'qwerty "asdf fdsa" or \'zxcvb\'';
    const count = component.portfolioService.model.portfolioModel.filtered.Projects.length;

    expect(count).toBeDefined();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
  });

  it('should search for data', () => {
    expect(() => {
      component.LoadData(mockDataService);
      engine.searchService.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should toggle decorations', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.toolbarService.decorations;
      component.portfolioService.toolbarService.decorations = true;
      component.portfolioService.toolbarService.decorations = false;
      component.portfolioService.toolbarService.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.toolbarService.tagCloud;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.chart;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.both;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.both;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.chart;
      component.portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should click tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.toolbarService.tagCloud;
      const header = component.headerComponents?.find((_) => _.key === 'Project Summary');
      if (header) {
        TestingCommon.shouldSimulateMouseClick([
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.chartElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.bothElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
        ]);
      }
      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should click tagCloud', () => {
    expect(() => {
      const value = component.portfolioService.toolbarService.tagCloud;
      const header = component.headerComponents?.find((_) => _.key === 'Project Summary');
      if (header) {
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.chartElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.bothElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
        ]);
      }
      component.portfolioService.toolbarService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should simulate mouse click at the link to this symbol button', () => {
    expect(() => {
      const header = component.headerComponents?.find((_) => _.key === 'Navigation');
      if (header) { TestingCommon.shouldSimulateMouseClick([header.headerTitle.clickable]); }
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the link to this symbol button', () => {
    expect(() => {
      const header = component.headerComponents?.find((_) => _.key === 'Navigation');
      if (header) { TestingCommon.shouldSimulateMouseClickUsingKeyboard([header.headerTitle.clickable]); }
    }).not.toThrowError();
  });

  it('should simulate mouse click at the headers', () => {
    expect(() => {
      component.LoadData(mockDataService);
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the headers', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  for (let i = 0; i < 2; i++) {
    ((__) => {
      it('should simulate mouse click at the extra-functions controls ' + __, () => {
        expect(() => {
          component.LoadData(mockDataService);
          component.headerComponents?.forEach((header) => {
            const toggles = [
              ...header.toolbar.toggleComponents,
              header.toolbar.tagCloudEmphasisTruncator?.tagCloudEmphasisToggle,
              // header.toolbar.tagCloudDisplayModeMultiToggle.,
            ];
            TestingCommon.shouldSimulateMouseClick(toggles.map((_) => _.clickableToggle));
            TestingCommon.shouldSimulateMouseClick(toggles.map((_) => _.inputToggle));
          });
        }).not.toThrowError();
      });

      it('should simulate mouse click using keyboard at the extra-functions controls ' + __, () => {
        expect(() => {
          component.headerComponents?.forEach((header) => {
            const toggles = [
              ...header.toolbar.toggleComponents,
              header.toolbar.tagCloudEmphasisTruncator?.tagCloudEmphasisToggle,
              // header.toolbar.tagCloudDisplayModeMultiToggle.,
            ];
            TestingCommon.shouldSimulateMouseClickUsingKeyboard(toggles.map((_) => _.clickableToggle));
            TestingCommon.shouldSimulateMouseClickUsingKeyboard(toggles.map((_) => _.inputToggle));
          });
        }).not.toThrowError();
      });
    })(i);
  }

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickableGoToTop]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableGoToTop]);
    }).not.toThrowError();
  });

  it('should check ui',
    () => { expect(() => { const readAll = component.portfolioService.model.portfolioModel.ui; }).not.toThrowError(); });
  it('should check entities',
    () => { expect(() => { const readAll = component.portfolioService.model.portfolioModel.entities; }).not.toThrowError(); });
  it('should check cv',
    () => { expect(() => { const readAll = component.portfolioService.model.portfolioModel.cv; }).not.toThrowError(); });
  it('should check projects',
    () => { expect(() => { const readAll = component.portfolioService.model.portfolioModel.projects; }).not.toThrowError(); });
  it('should check projectsAccomplishmentClassList',
    () => { expect(() => { const readAll = component.accomplishmentsService.projectsAccomplishmentClassList; }).not.toThrowError(); });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface properties', () => {
    // eslint-disable-next-line max-lines-per-function
    expect(() => {
      let readAll;
      readAll = component.uiService.componentName;

      readAll = component.uiService.linkToThisSymbol;
      readAll = component.uiService.linkToThisText;
      readAll = component.accomplishmentsService.projectsAccomplishmentClassList;

      component.portfolioService.model.entitiesModel.countCache = component.portfolioService.model.entitiesModel.countCache;

      component.portfolioService.model.portfolioModel.filtered.Accomplishments =
        component.portfolioService.model.portfolioModel.filtered.Accomplishments;
      component.portfolioService.model.portfolioModel.filtered.Education =
        component.portfolioService.model.portfolioModel.filtered.Education;
      component.portfolioService.model.portfolioModel.filtered.ProfessionalExperience =
        component.portfolioService.model.portfolioModel.filtered.ProfessionalExperience;
      component.portfolioService.model.portfolioModel.filtered.Projects =
        component.portfolioService.model.portfolioModel.filtered.Projects;
      component.portfolioService.model.portfolioModel.filtered.Publications =
        component.portfolioService.model.portfolioModel.filtered.Publications;

      component.portfolioService.toolbarService.decorations = component.portfolioService.toolbarService.decorations;
      component.portfolioService.toolbarService.pagination = component.portfolioService.toolbarService.pagination;

      readAll = component.portfolioService.model.portfolioModel.filtered;
      readAll = component.portfolioService.model.portfolioModel.filtered.Certifications;
      readAll = component.portfolioService.model.portfolioModel.filtered.Languages;
      readAll = component.portfolioService.model.portfolioModel.filtered.Courses;
      readAll = component.portfolioService.model.portfolioModel.filtered.Organizations;
      readAll = component.portfolioService.model.portfolioModel.filtered.Volunteering;
      readAll = component.portfolioService.model.portfolioModel.filtered.Vacation;

      readAll = component.ToggleKind;
    }).not.toThrowError();
  });

  it('should check getAssetUri',
    () => { expect(() => { const readAll = component.uiService.imageService.getAssetUri(''); }).not.toThrowError(); });
  it('should check linkLabel',
    () => { expect(() => { const readAll = component.uiService.linkLabel(''); }).not.toThrowError(); });
  it('should check label',
    () => { expect(() => { const readAll = component.uiService.label(''); }).not.toThrowError(); });

  it('should check public ui service interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.tabName('key');
      [false, true, undefined].forEach((_) => readAll = component.uiService.imageService.getProjectProjectImageUri('', _));
      readAll = component.uiService.imageService.getBackgroundLogoImageUri('');
      readAll = component.uiService.imageService.isEmptyProjectProjectImage(debugComponent.placeholderImageName);
      readAll = component.uiService.imageService.isEmptyProjectProjectImage('no ' + debugComponent.placeholderImageName);
    }).not.toThrowError();
  });

  it('should check public document service interface methods', () => {
    expect(() => {
      const readAll = component.documentService.goToTop();
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
      readAll = engine.searchService.updateSearchToken('kon');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.imageService.getSafeUri('');

      const searchText = component.uiService?.ui?.Search;
      if (searchText) { searchText.text = searchText.text === 'Search' ? 'EncryptedSearch' : 'Search'; }
      readAll = component.uiService.imageService.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      const readAll = component.portfolioService.persistenceService.saveToggle(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.inputService.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.linkLabel(undefined);

      readAll = debugComponent.subscribeUiInvalidated();
      readAll = debugComponent.unsubscribeUiInvalidated();
      readAll = debugComponent.refreshUI();
      readAll = debugComponent.windowReload();
    }).not.toThrowError();
  });
});

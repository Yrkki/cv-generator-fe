import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { HttpClient } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { Project } from '../../classes/project/project';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<PortfolioComponent>;
  let mockDataService: MockDataService;

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

  it('should click tagCloud', () => {
    expect(() => {
      component.LoadData(mockDataService);
      const value = component.portfolioService.tagCloud;
      const header = component.headerComponents?.find((_) => _.key === 'Project Summary');
      if (header) {
        TestingCommon.shouldSimulateMouseClick([
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.chartElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.bothElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
        ]);
      }
      component.portfolioService.tagCloud = value;
    }).not.toThrowError();
  });

  it('should click tagCloud', () => {
    expect(() => {
      const value = component.portfolioService.tagCloud;
      const header = component.headerComponents?.find((_) => _.key === 'Project Summary');
      if (header) {
        TestingCommon.shouldSimulateMouseClickUsingKeyboard([
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.chartElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.bothElement,
          header.toolbar.tagCloudDisplayModeMultiToggle.tagCloudElement,
        ]);
      }
      component.portfolioService.tagCloud = value;
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

  it('should check ui', () => { expect(() => { const readAll = component.portfolioService.ui; }).not.toThrowError(); });
  it('should check entities', () => { expect(() => { const readAll = component.portfolioService.entities; }).not.toThrowError(); });
  it('should check cv', () => { expect(() => { const readAll = component.portfolioService.cv; }).not.toThrowError(); });
  it('should check projects', () => { expect(() => { const readAll = component.portfolioService.projects; }).not.toThrowError(); });
  it('should check projectsAccomplishmentClassList',
    () => { expect(() => { const readAll = component.accomplishmentsService.projectsAccomplishmentClassList; }).not.toThrowError(); });

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

      component.portfolioService.decorations = component.portfolioService.decorations;
      component.portfolioService.pagination = component.portfolioService.pagination;

      readAll = component.portfolioService.filtered;
      readAll = component.portfolioService.filtered.Certifications;
      readAll = component.portfolioService.filtered.Languages;
      readAll = component.portfolioService.filtered.Courses;
      readAll = component.portfolioService.filtered.Organizations;
      readAll = component.portfolioService.filtered.Volunteering;
      readAll = component.portfolioService.filtered.Vacation;

      readAll = component.ToggleKind;
    }).not.toThrowError();
  });

  it('should check getAssetUri', () => { expect(() => { const readAll = component.uiService.getAssetUri(''); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = component.uiService.linkLabel(''); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = component.uiService.label(''); }).not.toThrowError(); });

  it('should check public ui service interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.uiService.tabName('key');
      [false, true, undefined].forEach((_) => readAll = component.uiService.getProjectProjectImageUri('', _));
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
      readAll = component.portfolioService.persistenceService.saveToggle(new MouseEvent('click'));
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

      readAll = debugComponent.subscribeUiInvalidated();
      readAll = debugComponent.unsubscribeUiInvalidated();
      readAll = debugComponent.refreshUI();
      readAll = debugComponent.windowReload();
    }).not.toThrowError();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ProjectComponent } from './project.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { HttpClient } from '@angular/common/http';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  // let httpTestingController: HttpTestingController;
  let mockDataService: MockDataService;
  let portfolioService: PortfolioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
        // HttpClientTestingModule
      ],
      providers: [
        ProjectComponent,
        HttpClient
      ]
    }).compileComponents();
    // httpTestingController = TestBed.inject(HttpTestingController);
    mockDataService = TestBed.inject(MockDataService);
    portfolioService = TestBed.inject(PortfolioService);
  }));

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize taking mock data', () => {
    expect(() => { component.LoadData(mockDataService); }).not.toThrowError();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrowError();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      // globalThis.print();
      const readAll = component.onBeforePrint(new Event('print'));
      globalThis.dispatchEvent(new KeyboardEvent('keypress', { key: 'Escape' }));
    }).not.toThrowError();
  });

  it('should check decorations', () => {
    expect(() => {
      let readAll;
      readAll = component.decorations;
    }).not.toThrowError();
  });

  it('should check tabName', () => {
    expect(() => {
      let readAll;
      readAll = component.tabName('');
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickableGanttChart?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableContributions?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableList?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableIndex?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableProjects?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should respond to search', () => {
    expect(() => {
      portfolioService.SearchToken = 'test';
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
      readAll = component.frequenciesDivider;
      readAll = component.componentName;
      readAll = component.countCache;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.getInjector({});
      readAll = component.getInjector({}, 1);
      readAll = component.getProjectStartsNewPeriod({});
      readAll = component.getDecryptedProjectPeriod({});
      readAll = component.tabName('');
      readAll = component.toTitleCase('test');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});

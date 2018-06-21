import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { MockDataService } from '../../services/mock-data/mock-data.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';

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

  it('should initialize', () => {
    expect(() => { component.ngAfterViewInit(); }).not.toThrowError();
  });

  it('should take mock data', () => {
    expect(() => { component.ngAfterViewInit(mockDataService); }).not.toThrowError();
  });

  it('should search for data', () => {
    expect(() => {
      component.ngAfterViewInit(mockDataService);
      component.searchToken = 'kon';
    }).not.toThrowError();
  });

  it('should test all charts', () => {
    expect(() => {
      component.ngAfterViewInit(mockDataService);
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
      component.ngAfterViewInit(mockDataService);
      component.decorations = !component.decorations;
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.ui;
      readAll = component.isEmpty({});
      readAll = component.getAssetUri('');
      readAll = component.linkLabel('');
      // ...
    }).not.toThrowError();
  });
});

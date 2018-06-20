import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumComponent } from './spectrum.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('SpectrumComponent', () => {
  let component: SpectrumComponent;
  let fixture: ComponentFixture<SpectrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        SpectrumComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumComponent);
    component = fixture.componentInstance;
    component.key = 'Client';
    component.portfolioComponent.tagCloud = component.tagCloudDisplayMode.chart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.ngAfterViewInit(); }).not.toThrowError();
  });

  it('should resize window', () => {
    expect(() => {
      window.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize chart', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.chart;
      component.ngAfterViewInit();
      window.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize tag cloud', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.tagCloud;
      component.ngAfterViewInit();
      window.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize both tag cloud and chart', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.both;
      component.ngAfterViewInit();
      window.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      const readAll = component.entities;
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      const readAll = component.ui;
    }).not.toThrowError();
  });

  it('should check key', () => {
    expect(() => {
      const readAll = component.key;
    }).not.toThrowError();
  });

  it('should check tagCloud', () => {
    expect(() => {
      const readAll = component.tagCloud;
    }).not.toThrowError();
  });

  it('should check searchToken', () => {
    expect(() => {
      const readAll = component.searchToken;
      component.searchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check simpleChart', () => {
    expect(() => {
      const readAll = component.simpleChart;
    }).not.toThrowError();
  });

  it('should check chartHeight', () => {
    expect(() => {
      const readAll = component.chartHeight;
    }).not.toThrowError();
  });

  it('should check chartWidth', () => {
    expect(() => {
      const readAll = component.chartWidth;
    }).not.toThrowError();
  });

  it('should check getFrequenciesCache', () => {
    expect(() => {
      const readAll = component.getFrequenciesCache(component.key);
    }).not.toThrowError();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrowError();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      const readAll = component.onBeforePrint({});
    }).not.toThrowError();
  });
});

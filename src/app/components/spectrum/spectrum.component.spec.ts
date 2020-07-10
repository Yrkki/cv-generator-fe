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
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should resize window', () => {
    expect(() => {
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize chart', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.chart;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize tag cloud', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.tagCloud;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize both tag cloud and chart', () => {
    expect(() => {
      component.portfolioComponent.tagCloud = component.portfolioComponent.tagCloudDisplayMode.both;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
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

  it('should check SearchToken', () => {
    expect(() => {
      const readAll = component.SearchToken;
      component.SearchToken = 'kon';
    }).not.toThrowError();
  });

  it('should check simpleChart', () => {
    expect(() => {
      const readAll = component.simpleChart;
    }).not.toThrowError();
  });

  it('should check chartHeight and chartWidth', () => {
    expect(() => {
      // combine optional params
      ['Client', ''].forEach(key => {
        component.key = key;
        [component.tagCloudDisplayMode.chart, component.tagCloudDisplayMode.both].forEach(tagCloud => {
          component.portfolioComponent.tagCloud = tagCloud;

          let readAll;
          readAll = component.chartHeight;
          readAll = component.chartWidth;
        });
      });
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

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});

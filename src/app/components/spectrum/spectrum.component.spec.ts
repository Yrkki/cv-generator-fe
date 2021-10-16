// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// eslint-disable-next-line no-redeclare
/*global globalThis*/
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SpectrumComponent } from './spectrum.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

// eslint-disable-next-line max-lines-per-function
describe('SpectrumComponent', () => {
  let component: SpectrumComponent;
  let fixture: ComponentFixture<SpectrumComponent>;
  let debugComponent: any;
  let portfolioService: PortfolioService;
  let sorterService: SorterService;
  let truncatorService: TruncatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        SpectrumComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioService = TestBed.inject(PortfolioService);
    sorterService = TestBed.inject(
      SorterServiceFactory.InjectionToken(SorterKind.Spectrum,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    truncatorService = TestBed.inject(
      TruncatorServiceFactory.InjectionToken(TruncatorKind.Ps,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;

    component.key = 'Client';
    portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.chart;

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
      portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.chart;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize tag cloud', () => {
    expect(() => {
      portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.tagCloud;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should display and resize both tag cloud and chart', () => {
    expect(() => {
      portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.both;
      component.Initialize();
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      const readAll = component.portfolioService.model.portfolioModel.ui;
    }).not.toThrowError();
  });

  it('should check key', () => {
    expect(() => {
      const readAll = component.key;
    }).not.toThrowError();
  });

  it('should check tagCloud', () => {
    expect(() => {
      const readAll = component.portfolioService.toolbarService.tagCloud;
    }).not.toThrowError();
  });

  it('should respond to search', () => {
    expect(() => {
      component.engine.searchService.SearchToken = 'kon';
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
      ['Client', ''].forEach((key) => {
        component.key = key;
        [TagCloudDisplayMode.chart, TagCloudDisplayMode.both].forEach((tagCloud) => {
          portfolioService.toolbarService.tagCloud = tagCloud;

          let readAll;
          readAll = component.chartHeight;
          readAll = component.chartWidth;
          component.getFrequenciesCache = () => [];
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

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.inputService.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check onResponsiveToggled', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.onResponsiveToggled({ sourceEntityKey: 'string', value: true });
      readAll = debugComponent.onResponsiveToggled({ sourceEntityKey: 'Project Summary', value: true });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.portfolioService.toolbarService.tagCloud;
      readAll = component.uiService.frequenciesDivider;
      readAll = component.TagCloudDisplayMode;

      component.PsFocusThreshold = component.PsFocusThreshold;
      debugComponent.persistenceService.getItem = () => undefined;
      readAll = component.PsFocusThreshold;

      readAll = component.truncated;
      readAll = component.remainingLength;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.trackByFn(0, 0);

      const propertyName = 'Responsibilities';
      readAll = component.getFrequenciesCache(propertyName);
      component.portfolioService.checkToggleCollapsed = () => false;
      readAll = component.getFrequenciesCache(propertyName);

      readAll = component.truncatorService.truncated([]);
      component.truncatorService.truncated = () => [];
      readAll = component.truncatorService.truncated([]);

      readAll = component.truncatorService.remaining([]);
      readAll = component.truncatorService.remainingLength([]);
      readAll = component.getFrequencyStyle(component.engine.filterService.emptyFrequency);
      readAll = debugComponent.onSearchTokenChanged();

      debugComponent.responsiveModelChanged = undefined;
      debugComponent.searchTokenSubscription = undefined;
      // tslint:disable-next-line: no-lifecycle-call
      readAll = component.ngOnDestroy();
    }).not.toThrowError();
  });
});

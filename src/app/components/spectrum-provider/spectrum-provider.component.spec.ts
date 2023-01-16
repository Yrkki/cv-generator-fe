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
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SpectrumProviderComponent } from './spectrum-provider.component';

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
describe('SpectrumProviderComponent', () => {
  let component: SpectrumProviderComponent;
  let fixture: ComponentFixture<SpectrumProviderComponent>;
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
        SpectrumProviderComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioService = TestBed.inject(PortfolioService);
    const sorterKind = SorterKind.Spectrum;
    sorterService = TestBed.inject(
      SorterServiceFactory.InjectionToken(sorterKind,
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
    sorterService.sorterKind = sorterKind;
    truncatorService = TestBed.inject(
      TruncatorServiceFactory.InjectionToken(TruncatorKind.Ps,
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumProviderComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;

    component.key = 'Client';
    portfolioService.toolbarService.tagCloud = TagCloudDisplayMode.chart;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    let readAll;
    readAll = component.portfolioService.toolbarService.tagCloud;
    readAll = component.uiService.frequenciesDivider;
    readAll = component.TagCloudDisplayMode;

    component.truncatorService.FocusThreshold = component.truncatorService.FocusThreshold;
    debugComponent.persistenceService.getItem = () => undefined;
    component.truncatorService.FocusThreshold = component.truncatorService.FocusThreshold;

    component.sorterService.sorterKind = sorterService.sorterKind;
    readAll = component.truncated;  // dependent on valid generic sorter sorterKind (for sortFields JSON.parse of subSortField.*)

    readAll = component.remainingLength;
    expect(component).toBeTruthy();
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
    }).not.toThrowError();
  });
});

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
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { ChartService } from '../../services/chart/chart.service';
import { ChangeNotificationService } from '../../services/change-notification/change-notification.service';

// eslint-disable-next-line max-lines-per-function
describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let debugComponent: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        LanguageComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrow();
  });
  it('should draw the language chart after the next render', async () => {
    const chartService = TestBed.inject(ChartService);
    component.portfolioService.model.cv = { Languages: [] } as any;
    vi.spyOn(chartService, 'addLanguageChart').mockReturnValue({} as any);
    const drawChart = vi.spyOn(chartService, 'drawChart').mockImplementation(() => { });
    component.Initialize();
    expect(drawChart).not.toHaveBeenCalled();
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(drawChart).toHaveBeenCalledWith('Language', {});
  });
  it('should draw the language chart when the languages arrive late', async () => {
    const chartService = TestBed.inject(ChartService);
    vi.spyOn(chartService, 'addLanguageChart').mockReturnValue({} as any);
    const drawChart = vi.spyOn(chartService, 'drawChart').mockImplementation(() => { });
    component.portfolioService.model.cv = {} as any;
    component.Initialize();
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(drawChart).not.toHaveBeenCalled();
    component.portfolioService.model.cv = { Languages: [{ Language: 'Lorem', Share: 1 }] } as any;
    const changeNotificationService = TestBed.inject(ChangeNotificationService);
    changeNotificationService.dataChanged$.next();
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(drawChart).toHaveBeenCalledTimes(1);
    changeNotificationService.dataChanged$.next();
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(drawChart).toHaveBeenCalledTimes(1);
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrow();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = component.key;
    }).not.toThrow();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.drawLanguageChart();
      debugComponent.portfolioService.model.cv = undefined;
      readAll = debugComponent.drawLanguageChart();

      readAll = debugComponent.onResponsiveToggled({ sourceEntityKey: 'Languages Chart', value: true });
      readAll = debugComponent.onResponsiveToggled({ sourceEntityKey: 'string', value: true });

      debugComponent.responsiveModelChanged = undefined;
      // tslint:disable-next-line: no-lifecycle-call
      readAll = component.ngOnDestroy();
    }).not.toThrow();
  });

  it('should check sunscriptions', () => {
    component.portfolioService.toolbarService.responsiveModelChanged$.emit({ sourceEntityKey: 'Language', value: true });
    expect(component).toBeTruthy();
  });
});

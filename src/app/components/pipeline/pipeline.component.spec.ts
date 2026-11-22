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
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PipelineComponent } from './pipeline.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { EntitiesService } from '../../services/entities/entities.service';

// eslint-disable-next-line max-lines-per-function
describe('PipelineComponent', () => {
  let component: PipelineComponent;
  let fixture: ComponentFixture<PipelineComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should register its leaves count lazily under its own key', () => {
    const entitiesService = TestBed.inject(EntitiesService);
    component.portfolioService.model.countCache = {};
    expect(component.key).toBe('Pipeline');
    expect(entitiesService.getCountValue(component.key)).toBe(component.LeavesCount);
    expect(entitiesService.getCountValueFormatted(component.key)).toBe(`(${component.LeavesCount})`);
  });
  it('should keep the version empty and not throw when the version request fails', () => {
    vi.spyOn(TestBed.inject(DataService), 'getVersion').mockReturnValue(throwError(() => new Error('failed')));
    component.version = '';
    expect(() => { component.Initialize(); }).not.toThrow();
    expect(component.version).toBe('');
  });
  it('should set the version and mark for check when a late version response arrives', () => {
    const response$ = new Subject<any>();
    vi.spyOn(TestBed.inject(DataService), 'getVersion').mockReturnValue(response$);
    const markForCheck = vi.spyOn((component as any).changeDetectorRef as ChangeDetectorRef, 'markForCheck');
    component.version = '';
    component.Initialize();
    expect(component.version).toBe('');
    response$.next({ builds: [{ version: '1.2-3' }] });
    expect(component.version).toBe('1.2–3');
    expect(markForCheck).toHaveBeenCalled();
  });
  it('should ignore a version response without a build version', () => {
    const response$ = new Subject<any>();
    vi.spyOn(TestBed.inject(DataService), 'getVersion').mockReturnValue(response$);
    component.version = '';
    component.Initialize();
    response$.next({});
    expect(component.version).toBe('');
  });

  it('should initialize', () => { expect(() => { component.Initialize(); }).not.toThrow(); });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrow(); });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrow();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrow();
  });

  it('should check public interface', () => {
    expect(() => {
      TestingCommon.shouldCheckPublicInterface(component);
    }).not.toThrow();
  });
});

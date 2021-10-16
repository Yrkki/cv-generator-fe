// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { FooterProviderComponent } from './footer-provider.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { DataService } from '../../services/data/data.service';

// eslint-disable-next-line max-lines-per-function
describe('FooterProviderComponent', () => {
  let component: FooterProviderComponent;
  let fixture: ComponentFixture<FooterProviderComponent>;
  let debugComponent: any;
  let dataService: DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterProviderComponent],
      imports: [
        HttpClientModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProviderComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      TestingCommon.shouldCheckPublicInterface(component);

      let readAll;
      readAll = component.getAssetUri('');
      readAll = component.linkLabel('');
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});

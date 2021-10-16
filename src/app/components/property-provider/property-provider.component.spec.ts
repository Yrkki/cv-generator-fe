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
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyProviderComponent } from './property-provider.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('PropertyProviderComponent', () => {
  let component: PropertyProviderComponent;
  let fixture: ComponentFixture<PropertyProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        PropertyProviderComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check entities', () => {
    expect(() => {
      const readAll = component.entities;
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      const readAll = component.ui;
    }).not.toThrowError();
  });

  it('should check getBackgroundLogoImageUri', () => {
    expect(() => {
      const readAll = component.getBackgroundLogoImageUri('');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      const readAll = component.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check getJsDateValueFromExcel', () => {
    expect(() => {
      const readAll = component.getJsDateValueFromExcel(12345);
    }).not.toThrowError();
  });

  it('should check linkLabel', () => {
    expect(() => {
      const readAll = component.linkLabel('');
    }).not.toThrowError();
  });
});

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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { SocBarComponent } from './soc-bar.component';

// eslint-disable-next-line max-lines-per-function
describe('SocBarComponent', () => {
  let component: SocBarComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SocBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
      ],
      providers: [
        SocBarComponent,
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocBarComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
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

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      component.barTypeCorporate = component.barTypeCorporate;

      readAll = component.uiService;

      readAll = component.socBar;
      readAll = component.corporateBar;

      readAll = debugComponent.address;
      readAll = debugComponent.phone;
      readAll = debugComponent.email;
      readAll = debugComponent.web;

      readAll = debugComponent.corporateAddress;
      readAll = debugComponent.corporateAddressLink;
      readAll = debugComponent.corporatePhone;
      readAll = debugComponent.corporateEmail;
      readAll = debugComponent.corporateWeb;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.linkLabel('');
      readAll = component.cleanProtocol('http://google.com');
      readAll = component.cleanProtocol('https://google.com');
    }).not.toThrowError();
  });
});

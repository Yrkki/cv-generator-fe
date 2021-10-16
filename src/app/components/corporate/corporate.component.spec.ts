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

import { CorporateComponent } from './corporate.component';
import { SocBarComponent } from '../soc-bar/soc-bar.component';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('CorporateComponent', () => {
  let component: CorporateComponent;
  let fixture: ComponentFixture<CorporateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        SocBarComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateComponent);
    component = fixture.componentInstance;
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

  it('should check public interface', () => {
    expect(() => {
      const readAll = component.setTitle('CV Generator');
    }).not.toThrowError();
  });
});

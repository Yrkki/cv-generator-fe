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

import { CvComponent } from './cv.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CvComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true } ));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = component.portfolioService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});

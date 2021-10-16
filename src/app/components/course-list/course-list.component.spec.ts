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
import { HttpClientModule } from '@angular/common/http';

import { CourseListComponent } from './course-list.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

// eslint-disable-next-line max-lines-per-function
describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with no params', () => {
    expect(() => {
      const readAll = new CourseListComponent(
        TestBed.inject(PortfolioService),
        TestBed.inject(InputService),
        TestBed.inject(UiService),
        TestBed.inject(DataService),
        TestBed.inject(ExcelDateFormatterService),
        undefined,
      );
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.i;

      readAll = component.LanguageComponent;
    }).not.toThrowError();
  });
});

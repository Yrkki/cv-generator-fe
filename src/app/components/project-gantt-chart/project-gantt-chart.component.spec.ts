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
import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { ProjectGanttChartComponent } from './project-gantt-chart.component';

// eslint-disable-next-line max-lines-per-function
describe('ProjectGanttChartComponent', () => {
  let component: ProjectGanttChartComponent;
  let fixture: ComponentFixture<ProjectGanttChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGanttChartComponent ],
      imports: [
        AppModule,
        FormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGanttChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = component.key;
    }).not.toThrowError();
  });
});

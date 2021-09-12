// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGanttChartComponent } from './project-gantt-chart.component';

describe('ProjectGanttChartComponent', () => {
  let component: ProjectGanttChartComponent;
  let fixture: ComponentFixture<ProjectGanttChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGanttChartComponent ]
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
});

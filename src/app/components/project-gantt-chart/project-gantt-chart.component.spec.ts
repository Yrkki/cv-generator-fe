import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGanttChartComponent } from './project-gantt-chart.component';

describe('ProjectGanttChartComponent', () => {
  let component: ProjectGanttChartComponent;
  let fixture: ComponentFixture<ProjectGanttChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGanttChartComponent ]
    })
    .compileComponents();
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

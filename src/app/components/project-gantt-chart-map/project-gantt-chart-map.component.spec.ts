import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGanttChartMapComponent } from './project-gantt-chart-map.component';

describe('ProjectGanttChartMapComponent', () => {
  let component: ProjectGanttChartMapComponent;
  let fixture: ComponentFixture<ProjectGanttChartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGanttChartMapComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGanttChartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

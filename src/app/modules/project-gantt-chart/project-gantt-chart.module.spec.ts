import { ProjectGanttChartModule } from './project-gantt-chart.module';

describe('ProjectGanttChartModule', () => {
  let projectGanttChartModule: ProjectGanttChartModule;

  beforeEach(() => {
    projectGanttChartModule = new ProjectGanttChartModule();
  });

  it('should create an instance', () => {
    expect(projectGanttChartModule).toBeTruthy();
  });
});

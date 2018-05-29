export class GanttChartEntry implements GanttChartEntry {
}

export interface GanttChartEntry {
  'Id': number;
  'From': number;
  'To': number;
  'From Year': number;
  'From Month': number;
  'Project name': string;
  'Start': number;
  'Months total': number;
  'Industry': string;
  'Project type': string;
  'Role': string;
  'Color': string;
}

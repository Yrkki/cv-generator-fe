import { GanttChartEntry as IGanttChartEntry } from './../../interfaces/gantt-chart-entry/gantt-chart-entry';

/**
 * Gantt chart entry class.
 * ~implements {@link IGanttChartEntry}
 */
export class GanttChartEntry implements IGanttChartEntry {
  /** The Id */
  'Id': number;
  /** The From */
   'From': number;
  /** The To */
   'To': number;
  /** The From Year */
   'From Year': number;
  /** The From Month */
   'From Month': number;
  /** The Project name */
   'Project name': string;
  /** The Start */
   'Start': number;
  /** The Months total */
   'Months total': number;
  /** The Industry */
   'Industry': string;
  /** The Project type */
   'Project type': string;
  /** The Role */
   'Role': string;
  /** The Color */
   'Color': string;
}

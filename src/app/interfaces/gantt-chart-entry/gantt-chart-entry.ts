import { Indexable } from '../indexable';

/**
 * Gantt chart entry interface.
 * ~extends {@link Indexable}
 */
export interface GanttChartEntry extends Indexable {
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

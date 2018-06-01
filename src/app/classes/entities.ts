/** Entities */
export class Entities implements Entities {
}

/** Entity */
export interface Entity {
  /** The node (name). */
  'node': string;
  /** The parent. */
  'parent': string;
  /** The element class. */
  'class': string;
  /** Whether the entityis a main one. */
  'main': string;

  /** The key calculated filed. */
  'key': string;
  /** The section name calculated filed. */
  'section': string;
  /** The chart element name calculated filed. */
  'chart': string;
  /** The content element name calculated filed. */
  'content': string;
}

/** Entities */
export interface Entities {
  /** The Curriculum Vitae */
   'Curriculum Vitae': Entity;
  /** The Personal Data */
   'Personal Data': Entity;
  /** The Background */
   'Background': Entity;
  /** The Professional Experience */
   'Professional Experience': Entity;
  /** The Education */
   'Education': Entity;
  /** The Accomplishments */
   'Accomplishments': Entity;
  /** The Certifications */
   'Certifications': Entity;
  /** The Languages */
   'Languages': Entity;
  /** The Courses */
   'Courses': Entity;
  /** The Courses Index */
   'Courses Index': Entity;
  /** The Courses List */
   'Courses List': Entity;
  /** The Publications */
   'Publications': Entity;
  /** The Publications Index */
   'Publications Index': Entity;
  /** The Publications List */
   'Publications List': Entity;
  /** The Project Summary */
   'Project Summary': Entity;
  /** The Areas of Expertise */
   'Areas of Expertise': Entity;
  /** The Client */
   'Client': Entity;
  /** The Country */
   'Country': Entity;
  /** The Industry */
   'Industry': Entity;
  /** The Project type */
   'Project type': Entity;
  /** The System type */
   'System type': Entity;
  /** The Skills */
   'Skills': Entity;
  /** The Platform */
   'Platform': Entity;
  /** The Architecture */
   'Architecture': Entity;
  /** The Languages and notations */
   'Languages and notations': Entity;
  /** The IDEs and Tools */
   'IDEs and Tools': Entity;
  /** The Job Functions */
   'Job Functions': Entity;
  /** The Responsibilities */
   'Responsibilities': Entity;
  /** The Role */
   'Role': Entity;
  /** The Team size */
   'Team size': Entity;
  /** The Position */
   'Position': Entity;
  /** The Reference */
   'Reference': Entity;
  /** The Project Portfolio */
   'Project Portfolio': Entity;
  /** The Gantt Chart */
   'Gantt Chart': Entity;
  /** The List */
   'List': Entity;
  /** The Index */
   'Index': Entity;
  /** The Projects */
   'Projects': Entity;
  /** The Modern Age */
   'Modern Age': Entity;
  /** The Renaissance */
   'Renaissance': Entity;
  /** The Dark Ages */
   'Dark Ages': Entity;
  /** The General Timeline */
   'General Timeline': Entity;
  /** The Id */
   'Id': Entity;
  /** The From */
   'From': Entity;
  /** The To */
   'To': Entity;
  /** The Project name */
   'Project name': Entity;
  /** The Links */
   'Links': Entity;
  /** The References */
   'References': Entity;
}

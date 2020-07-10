import { Component, OnInit } from '@angular/core';

/**
 * CourseList component.
 * ~implements {@link OnInit}
 */
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  /**
   * Constructs the CourseList component.
   * ~constructor
   */
  constructor() { }

  /** OnInit handler */
  ngOnInit(): void {
  }
}

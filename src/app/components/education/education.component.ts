import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Education component
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatShort; }

  /**
   * Education subject.
   * @param propertyName The property name.
   */
  schoolSubject(propertyName) {
    const field = 'Field';
    return [
      propertyName[field],
      this.schoolDetail(propertyName)
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(': ');
  }

  /**
   * Education detail.
   * @param propertyName The property name.
   */
  schoolDetail(propertyName) {
    const degree = 'Degree';
    const major = 'Major';
    return [
      propertyName[degree],
      propertyName[major]
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(' in ');
  }

  /** TrackBy iterator help function. */
  trackByFn(index, item) {
    return index;
  }
}

import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Education } from '../../interfaces/cv/education';

/**
 * Education component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Injected education getter. */
  public get propertyName(): Education { return super.propertyName as Education; }

  /** Injected education setter. */
  public set propertyName(value: Education) { super.propertyName = value; }

  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatShort; }

  /**
   * Education subject.
   * @param propertyName The property name.
   */
  schoolSubject(propertyName: Education) {
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
  schoolDetail(propertyName: Education) {
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
  trackByFn(index: any, item: any) {
    return index;
  }
}

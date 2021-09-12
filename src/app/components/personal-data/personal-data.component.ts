// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Personal data component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent extends PropertyComponent {
}

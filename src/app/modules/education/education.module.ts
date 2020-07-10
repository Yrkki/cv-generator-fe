import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';

import { EducationComponent } from '../../components/education/education.component';

/** Education module. */
@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
    EducationRoutingModule,
  ],
  exports: [EducationComponent]
})
export class EducationModule { }

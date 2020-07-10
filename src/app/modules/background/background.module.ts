import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundRoutingModule } from './background-routing.module';
import { EducationModule } from '../education/education.module';
import { ProfessionalExperienceModule } from '../professional-experience/professional-experience.module';

import { BackgroundComponent } from '../../components/background/background.component';

/** Background module. */
@NgModule({
  declarations: [BackgroundComponent],
  imports: [
    CommonModule,
    BackgroundRoutingModule,
    EducationModule,
    ProfessionalExperienceModule,
  ],
  exports: [BackgroundComponent]
})
export class BackgroundModule { }

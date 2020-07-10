import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalExperienceRoutingModule } from './professional-experience-routing.module';

import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';

/** ProfessionalExperience module. */
@NgModule({
  declarations: [ProfessionalExperienceComponent],
  imports: [
    CommonModule,
    ProfessionalExperienceRoutingModule,
  ],
  exports: [ProfessionalExperienceComponent]
})
export class ProfessionalExperienceModule { }

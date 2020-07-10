import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';
const routes: Routes = [  { path: '', component: ProfessionalExperienceComponent }
];

/**
 * ProfessionalExperience routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalExperienceRoutingModule { }

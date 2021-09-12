// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackgroundComponent } from '../../components/background/background.component';
const routes: Routes = [
  { path: '', component: BackgroundComponent },
  { path: 'education', loadChildren: () => import('../education/education.module').then((m) => m.EducationModule) },
  { path: 'professional-experience',
    loadChildren: () => import('../professional-experience/professional-experience.module').then((m) => m.ProfessionalExperienceModule) }
];

/**
 * Background routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackgroundRoutingModule { }

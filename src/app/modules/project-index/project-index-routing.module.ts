// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectIndexComponent } from '../../components/project-index/project-index.component';
const routes: Routes = [  { path: '', component: ProjectIndexComponent }
];

/**
 * ProjectIndex routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectIndexRoutingModule { }

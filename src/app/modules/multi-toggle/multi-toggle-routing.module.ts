// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiToggleComponent } from '../../components/multi-toggle/multi-toggle.component';
const routes: Routes = [  { path: '', component: MultiToggleComponent }
];

/**
 * MultiToggle routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiToggleRoutingModule { }

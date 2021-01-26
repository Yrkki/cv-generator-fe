import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeComponent } from '../../components/badge/badge.component';
const routes: Routes = [
  { path: '', component: BadgeComponent },
];

/**
 * Badge routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgeRoutingModule { }

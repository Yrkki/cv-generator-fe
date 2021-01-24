import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpandToggleComponent } from '../../components/expand-toggle/expand-toggle.component';
const routes: Routes = [
  { path: '', component: ExpandToggleComponent },
];

/**
 * ExpandToggle routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandToggleRoutingModule { }

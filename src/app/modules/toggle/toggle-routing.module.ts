import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToggleComponent } from '../../components/toggle/toggle.component';
const routes: Routes = [  { path: '', component: ToggleComponent }
];

/**
 * Toggle routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToggleRoutingModule { }

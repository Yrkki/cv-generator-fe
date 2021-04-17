import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
const routes: Routes = [
  { path: '', component: ToolbarComponent },
];

/**
 * Toolbar routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolbarRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContextSwitcherComponent } from '../../components/context-switcher/context-switcher.component';
const routes: Routes = [  { path: '', component: ContextSwitcherComponent },
];

/**
 * ContextSwitcher routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextSwitcherRoutingModule { }

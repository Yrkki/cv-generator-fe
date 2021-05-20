import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectorComponent } from '../../components/selector/selector.component';
const routes: Routes = [  { path: '', component: SelectorComponent }
];

/**
 * Selector routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorRoutingModule { }

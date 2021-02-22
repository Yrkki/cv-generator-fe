import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SorterComponent } from '../../components/sorter/sorter.component';
const routes: Routes = [  { path: '', component: SorterComponent }
];

/**
 * Sorter routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SorterRoutingModule { }

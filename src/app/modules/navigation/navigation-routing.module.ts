import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationComponent } from '../../components/navigation/navigation.component';
const routes: Routes = [  { path: '', component: NavigationComponent }
];

/**
 * Navigation routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }

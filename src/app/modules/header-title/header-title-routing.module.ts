import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderTitleComponent } from '../../components/header-title/header-title.component';
const routes: Routes = [
  { path: '', component: HeaderTitleComponent },
];

/**
 * HeaderTitle routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderTitleRoutingModule { }

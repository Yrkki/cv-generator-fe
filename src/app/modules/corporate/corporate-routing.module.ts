import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorporateComponent } from '../../components/corporate/corporate.component';
const routes: Routes = [  { path: '', component: CorporateComponent },
{ path: 'soc-bar', loadChildren: () => import('../soc-bar/soc-bar.module').then((m) => m.SocBarModule) }
];

/**
 * Corporate routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateRoutingModule { }

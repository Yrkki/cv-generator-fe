import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebpageComponent } from '../../components/webpage/webpage.component';
const routes: Routes = [  { path: '', component: WebpageComponent },
{ path: 'soc-bar', loadChildren: () => import('../soc-bar/soc-bar.module').then(m => m.SocBarModule) }
];

/**
 * Webpage routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebpageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationComponent } from '../../components/publication/publication.component';
const routes: Routes = [
  { path: '', component: PublicationComponent },
  { path: 'publication-index',
    loadChildren: () => import('../publication-index/publication-index.module').then(m => m.PublicationIndexModule) },
  { path: 'publication-list', loadChildren: () => import('../publication-list/publication-list.module').then(m => m.PublicationListModule) }
];

/**
 * Publication routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }

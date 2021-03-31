import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvComponent } from '../../components/cv/cv.component';
const routes: Routes = [  { path: '', component: CvComponent },
{ path: 'personal-data', loadChildren: () => import('../personal-data/personal-data.module').then((m) => m.PersonalDataModule) },
{ path: 'background', loadChildren: () => import('../background/background.module').then((m) => m.BackgroundModule) },
{ path: 'accomplishments', loadChildren: () => import('../accomplishments/accomplishments.module').then((m) => m.AccomplishmentsModule) }
];

/**
 * Cv routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }

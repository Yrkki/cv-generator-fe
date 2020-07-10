import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';
const routes: Routes = [  { path: '', component: PortfolioComponent },
{ path: 'navigation', loadChildren: () => import('../navigation/navigation.module').then(m => m.NavigationModule) },
{ path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
{ path: 'cv', loadChildren: () => import('../cv/cv.module').then(m => m.CvModule) },
{ path: 'project-summary', loadChildren: () => import('../project-summary/project-summary.module').then(m => m.ProjectSummaryModule) },
{ path: 'project', loadChildren: () => import('../project/project.module').then(m => m.ProjectModule) },
{ path: 'general-timeline', loadChildren: () => import('../general-timeline/general-timeline.module').then(m => m.GeneralTimelineModule) },
{ path: 'footer', loadChildren: () => import('../footer/footer.module').then(m => m.FooterModule) },
{ path: 'property', loadChildren: () => import('../property/property.module').then(m => m.PropertyModule) }
];

/**
 * Portfolio routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }

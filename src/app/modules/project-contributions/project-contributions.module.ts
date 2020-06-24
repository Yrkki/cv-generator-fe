import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectContributionsComponent } from '../../components/project-contributions/project-contributions.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'ProjectContributions', component: ProjectContributionsComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [ProjectContributionsComponent],
  providers: [PortfolioComponent]
})
export class ProjectContributionsModule { }

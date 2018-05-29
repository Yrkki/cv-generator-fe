import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'ProjectCard', component: ProjectCardComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [ProjectCardComponent],
  providers: [PortfolioComponent]
})
export class ProjectCardModule { }

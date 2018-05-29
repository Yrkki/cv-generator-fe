import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectIndexComponent } from '../../components/project-index/project-index.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'ProjectIndex', component: ProjectIndexComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [ProjectIndexComponent],
  providers: [PortfolioComponent]
})
export class ProjectIndexModule { }

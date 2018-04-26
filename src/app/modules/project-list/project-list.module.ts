import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from '../../components/project-list/project-list.component';

export const ROUTES: Routes = [{ path: 'ProjectList', component: ProjectListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [ProjectListComponent]
})
export class ProjectListModule { }

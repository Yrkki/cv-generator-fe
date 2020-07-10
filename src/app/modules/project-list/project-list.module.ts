import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';

import { ProjectListComponent } from '../../components/project-list/project-list.component';

/** ProjectList module. */
@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
  ],
  exports: [ProjectListComponent]
})
export class ProjectListModule { }

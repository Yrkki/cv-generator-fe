import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { ProjectIndexRoutingModule } from './project-index-routing.module';

import { ProjectIndexComponent } from '../../components/project-index/project-index.component';

/** ProjectIndex module. */
@NgModule({
  declarations: [ProjectIndexComponent],
  imports: [
    CommonModule,
    ProjectIndexRoutingModule,
    SorterModule,
  ],
  exports: [ProjectIndexComponent]
})
export class ProjectIndexModule { }

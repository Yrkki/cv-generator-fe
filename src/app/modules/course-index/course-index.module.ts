import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseIndexComponent } from '../../components/course-index/course-index.component';

export const ROUTES: Routes = [{ path: 'CourseIndex', component: CourseIndexComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [CourseIndexComponent]
})
export class CourseIndexModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from '../../components/course-list/course-list.component';
const routes: Routes = [  { path: '', component: CourseListComponent }
];

/**
 * CourseList routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseListRoutingModule { }

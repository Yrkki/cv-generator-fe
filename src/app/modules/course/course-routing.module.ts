import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from '../../components/course/course.component';
const routes: Routes = [  { path: '', component: CourseComponent },
{ path: 'course-index', loadChildren: () => import('../course-index/course-index.module').then((m) => m.CourseIndexModule) },
{ path: 'course-list', loadChildren: () => import('../course-list/course-list.module').then((m) => m.CourseListModule) }
];

/**
 * Course routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }

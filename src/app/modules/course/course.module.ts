import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from '../../components/course/course.component';

export const ROUTES: Routes = [{ path: 'Course', component: CourseComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [CourseComponent]
})
export class CourseModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDataComponent } from '../../components/personal-data/personal-data.component';
const routes: Routes = [  { path: '', component: PersonalDataComponent }
];

/**
 * PersonalData routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDataRoutingModule { }

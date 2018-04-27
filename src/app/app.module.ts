import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';


import { AppComponent } from './app.component';

import { CvComponent } from './components/cv/cv.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';

import { CertificationModule } from './modules/certification/certification.module';
import { CourseIndexModule } from './modules/course-index/course-index.module';
import { CourseModule } from './modules/course/course.module';
import { EducationModule } from './modules/education/education.module';
import { LanguageModule } from './modules/language/language.module';
import { PersonalDataModule } from './modules/personal-data/personal-data.module';
import { ProfessionalExperienceModule } from './modules/professional-experience/professional-experience.module';
import { PropertyComponent } from './components/property/property.component';
import { PublicationModule } from './modules/publication/publication.module';

import { SpectrumComponent } from './components/spectrum/spectrum.component';

import { ProjectComponent } from './components/project/project.component';
import { ProjectIndexModule } from './modules/project-index/project-index.module';
import { ProjectListModule } from './modules/project-list/project-list.module';
import { ProjectCardModule } from './modules/project-card/project-card.module';

import { KeysPipe } from './pipes/keys/keys.pipe';


import { DataService } from './services/data/data.service';
import { ChartService } from './services/chart/chart.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';

import { LogUpdateService } from './services/log-update/log-update.service';
import { PromptUpdateService } from './services/prompt-update/prompt-update.service';
import { CheckForUpdateService } from './services/check-for-update/check-for-update.service';

import { IsSecureGuardService } from './services/is-secure-guard/is-secure-guard.service';

import { Params } from './services/component-outlet-injector/params';
import { ComponentOutletInjectorService } from './services/component-outlet-injector/component-outlet-injector.service';

const appRoutes: Routes = [
  { path: '', component: PortfolioComponent, canActivate: [IsSecureGuardService] },

  { path: 'Cv', component: CvComponent, canActivate: [IsSecureGuardService] },
  { path: 'ProjectSummary', component: ProjectSummaryComponent, canActivate: [IsSecureGuardService] },
  { path: 'Navigation', component: NavigationComponent, canActivate: [IsSecureGuardService] },
  { path: 'Search', component: SearchComponent, canActivate: [IsSecureGuardService] },
  { path: 'Certification', loadChildren: './modules/certification/certification.module#CertificationModule' },
  { path: 'CourseIndex', loadChildren: './modules/course-index/course-index.module#CourseIndexModule' },
  { path: 'Course', loadChildren: './modules/course/course.module#CourseModule' },
  { path: 'Education', loadChildren: './modules/education/education.module#EducationModule' },
  { path: 'Language', loadChildren: './modules/language/language.module#LanguageModule' },
  { path: 'PersonalData', loadChildren: './modules/personal-data/personal-data.module#PersonalDataModule' },
  { path: 'ProfessionalExperience', loadChildren: './modules/professional-experience/professional-experience.module#ProfessionalExperienceModule' },
  { path: 'Property', component: PropertyComponent, canActivate: [IsSecureGuardService] },
  { path: 'Publication', loadChildren: './modules/publication/publication.module#PublicationModule' },
  { path: 'Spectrum', component: SpectrumComponent, canActivate: [IsSecureGuardService] },
  { path: 'Project', component: ProjectComponent, canActivate: [IsSecureGuardService] },
  { path: 'ProjectIndex', loadChildren: './modules/project-index/project-index.module#ProjectIndexModule' },
  { path: 'ProjectList', loadChildren: './modules/project-list/project-list.module#ProjectListModule' },
  { path: 'ProjectCard', loadChildren: './modules/project-card/project-card.module#ProjectCardModule' },

  { path: '**', redirectTo: '', canActivate: [IsSecureGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,

    CvComponent,
    ProjectSummaryComponent,
    PortfolioComponent,

    NavigationComponent,
    SearchComponent,

    PropertyComponent,

    SpectrumComponent,

    ProjectComponent,

    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    CertificationModule,
    CourseIndexModule,
    CourseModule,
    EducationModule,
    LanguageModule,
    PersonalDataModule,
    ProfessionalExperienceModule,
    PublicationModule,
    ProjectIndexModule,
    ProjectListModule,
    ProjectCardModule,
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },

    DataService,
    ChartService,
    GanttChartService,
    TagCloudProcessorService,
    ExcelDateFormatterService,
    ComponentOutletInjectorService,

    LogUpdateService,
    PromptUpdateService,
    CheckForUpdateService,

    IsSecureGuardService,

    Params
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

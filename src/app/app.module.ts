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

import { CertificationComponent } from './components/certification/certification.component';
import { CourseIndexComponent } from './components/course-index/course-index.component';
import { CourseComponent } from './components/course/course.component';
import { EducationComponent } from './components/education/education.component';
import { LanguageComponent } from './components/language/language.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { PropertyComponent } from './components/property/property.component';
import { PublicationComponent } from './components/publication/publication.component';

import { SpectrumComponent } from './components/spectrum/spectrum.component';

import { ProjectComponent } from './components/project/project.component';
import { ProjectIndexComponent } from './components/project-index/project-index.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

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


const appRoutes: Routes = [
  { path: '', component: PortfolioComponent, canActivate: [IsSecureGuardService] },
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

    CertificationComponent,
    CourseIndexComponent,
    CourseComponent,
    EducationComponent,
    LanguageComponent,
    PersonalDataComponent,
    ProfessionalExperienceComponent,
    PropertyComponent,
    PublicationComponent,

    SpectrumComponent,

    ProjectComponent,
    ProjectIndexComponent,
    ProjectListComponent,
    ProjectCardComponent,

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
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },

    DataService,
    ChartService,
    GanttChartService,
    TagCloudProcessorService,
    ExcelDateFormatterService,

    LogUpdateService,
    PromptUpdateService,
    CheckForUpdateService,

    IsSecureGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

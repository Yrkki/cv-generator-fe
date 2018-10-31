import { BrowserModule, Title } from '@angular/platform-browser';
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

import { CourseIndexModule } from './modules/course-index/course-index.module';
import { CourseModule } from './modules/course/course.module';
import { EducationModule } from './modules/education/education.module';
import { LanguageModule } from './modules/language/language.module';
import { PersonalDataModule } from './modules/personal-data/personal-data.module';
import { ProfessionalExperienceModule } from './modules/professional-experience/professional-experience.module';
import { PropertyComponent } from './components/property/property.component';
import { PublicationIndexModule } from './modules/publication-index/publication-index.module';
import { PublicationModule } from './modules/publication/publication.module';

import { SpectrumComponent } from './components/spectrum/spectrum.component';
import { MapComponent } from './components/map/map.component';

import { ProjectComponent } from './components/project/project.component';
import { ProjectGanttChartModule } from './modules/project-gantt-chart/project-gantt-chart.module';
import { ProjectIndexModule } from './modules/project-index/project-index.module';
import { ProjectListModule } from './modules/project-list/project-list.module';
import { ProjectCardModule } from './modules/project-card/project-card.module';

import { GeneralTimelineModule } from './modules/general-timeline/general-timeline.module';

import { FooterModule } from './modules/footer/footer.module';

import { KeysPipe } from './pipes/keys/keys.pipe';


import { DataService } from './services/data/data.service';
import { ChartService } from './services/chart/chart.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { GeneralTimelineService } from './services/general-timeline/general-timeline.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';
import { SearchEngineService } from './services/search-engine/search-engine.service';
import { SearchTokenizerService } from './services/search-tokenizer/search-tokenizer.service';

import { LogUpdateService } from './services/log-update/log-update.service';
import { PromptUpdateService } from './services/prompt-update/prompt-update.service';
import { CheckForUpdateService } from './services/check-for-update/check-for-update.service';

import { IsSecureGuardService } from './services/is-secure-guard/is-secure-guard.service';

import { ComponentOutletInjectorService } from './services/component-outlet-injector/component-outlet-injector.service';
import { Params } from './services/component-outlet-injector/params';

import { WebpageComponent } from './components/webpage/webpage.component';
import { SocBarComponent } from './components/soc-bar/soc-bar.component';

const appRoutes: Routes = [
  { path: '', component: PortfolioComponent, canActivate: [IsSecureGuardService] },

  { path: 'Cv', component: CvComponent, canActivate: [IsSecureGuardService] },
  { path: 'ProjectSummary', component: ProjectSummaryComponent, canActivate: [IsSecureGuardService] },
  { path: 'Navigation', component: NavigationComponent, canActivate: [IsSecureGuardService] },
  { path: 'Search', component: SearchComponent, canActivate: [IsSecureGuardService] },
  { path: 'CourseIndex', loadChildren: './modules/course-index/course-index.module#CourseIndexModule', canActivate: [IsSecureGuardService] },
  { path: 'Course', loadChildren: './modules/course/course.module#CourseModule', canActivate: [IsSecureGuardService] },
  { path: 'Education', loadChildren: './modules/education/education.module#EducationModule', canActivate: [IsSecureGuardService] },
  { path: 'Language', loadChildren: './modules/language/language.module#LanguageModule', canActivate: [IsSecureGuardService] },
  { path: 'PersonalData', loadChildren: './modules/personal-data/personal-data.module#PersonalDataModule', canActivate: [IsSecureGuardService] },
  { path: 'ProfessionalExperience', loadChildren: './modules/professional-experience/professional-experience.module#ProfessionalExperienceModule', canActivate: [IsSecureGuardService] },
  { path: 'Property', component: PropertyComponent, canActivate: [IsSecureGuardService] },
  { path: 'PublicationIndex', loadChildren: './modules/publication-index/publication-index.module#PublicationIndexModule', canActivate: [IsSecureGuardService] },
  { path: 'Publication', loadChildren: './modules/publication/publication.module#PublicationModule', canActivate: [IsSecureGuardService] },
  { path: 'Spectrum', component: SpectrumComponent, canActivate: [IsSecureGuardService] },
  { path: 'Map', component: MapComponent, canActivate: [IsSecureGuardService] },
  { path: 'Project', component: ProjectComponent, canActivate: [IsSecureGuardService] },
  { path: 'ProjectGanttChart', loadChildren: './modules/project-gantt-chart/project-gantt-chart.module#ProjectGanttChartModule', canActivate: [IsSecureGuardService] },
  { path: 'ProjectIndex', loadChildren: './modules/project-index/project-index.module#ProjectIndexModule', canActivate: [IsSecureGuardService] },
  { path: 'ProjectList', loadChildren: './modules/project-list/project-list.module#ProjectListModule', canActivate: [IsSecureGuardService] },
  { path: 'ProjectCard', loadChildren: './modules/project-card/project-card.module#ProjectCardModule', canActivate: [IsSecureGuardService] },
  { path: 'GeneralTimeline', loadChildren: './modules/general-timeline/general-timeline.module#GeneralTimelineModule', canActivate: [IsSecureGuardService] },

  { path: 'Footer', loadChildren: './modules/footer/footer.module#FooterModule', canActivate: [IsSecureGuardService] },

  { path: 'Webpage', component: WebpageComponent, canActivate: [IsSecureGuardService] },
  { path: 'SocBar', component: SocBarComponent, canActivate: [IsSecureGuardService] },

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
    MapComponent,

    ProjectComponent,

    KeysPipe,

    WebpageComponent,

    SocBarComponent
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

    CourseIndexModule,
    CourseModule,
    EducationModule,
    LanguageModule,
    PersonalDataModule,
    ProfessionalExperienceModule,
    PublicationIndexModule,
    PublicationModule,
    ProjectGanttChartModule,
    ProjectIndexModule,
    ProjectListModule,
    ProjectCardModule,

    GeneralTimelineModule,

    FooterModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    Title,

    DataService,
    ChartService,
    GanttChartService,
    GeneralTimelineService,
    TagCloudProcessorService,
    ExcelDateFormatterService,
    SearchEngineService,
    SearchTokenizerService,
    ComponentOutletInjectorService, Params,

    LogUpdateService,
    PromptUpdateService,
    CheckForUpdateService,

    IsSecureGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Base url.
 */
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

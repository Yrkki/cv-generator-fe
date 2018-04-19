import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';

import { CertificationComponent } from './components/certification/certification.component';
import { CourseComponent } from './components/course/course.component';
import { EducationComponent } from './components/education/education.component';
import { LanguageComponent } from './components/language/language.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { PropertyComponent } from './components/property/property.component';
import { PublicationComponent } from './components/publication/publication.component';

import { KeysPipe } from './pipes/keys/keys.pipe';


import { DataService } from './services/data/data.service';
import { ChartService } from './services/chart/chart.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';

import { LogUpdateService } from './services/log-update/log-update.service';
import { PromptUpdateService } from './services/prompt-update/prompt-update.service';
import { CheckForUpdateService } from './services/check-for-update/check-for-update.service';

import { SpectrumComponent } from './components/spectrum/spectrum.component';


const appRoutes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,

    NavigationComponent,
    SearchComponent,

    CertificationComponent,
    CourseComponent,
    EducationComponent,
    LanguageComponent,
    PersonalDataComponent,
    ProfessionalExperienceComponent,
    PropertyComponent,
    PublicationComponent,

    KeysPipe,

    SpectrumComponent
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
    CheckForUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

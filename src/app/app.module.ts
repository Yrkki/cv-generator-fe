import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

import { DataService } from './services/data/data.service';
import { ChartService } from './services/chart/chart.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';

import { KeysPipe } from './pipes/keys/keys.pipe';

const appRoutes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**', redirectTo: 'portfolio' }
];

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
  { enableTracing: true } // <-- debugging purposes only
)
    // other imports here
  ],
  providers: [
    DataService,
    ChartService,
    GanttChartService,
    TagCloudProcessorService,
    ExcelDateFormatterService,
    { provide: 'BASE_URL', useFactory: getBaseUrl }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

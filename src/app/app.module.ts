import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**', redirectTo: 'portfolio' }
];

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
  { enableTracing: true } // <-- debugging purposes only
)
    // other imports here
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

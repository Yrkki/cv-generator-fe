import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'portfolio', loadChildren: () => import('./modules/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: 'webpage', loadChildren: () => import('./modules/webpage/webpage.module').then(m => m.WebpageModule) }
];

/**
 * App routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule]
  // exports: [RouterModule],
  // providers: [
  //   { provide: 'BASE_URL', useFactory: getBaseUrl },
  // ]
})
export class AppRoutingModule { }

// /**
//  * Base url.
//  */
// export function getBaseUrl(): string {
//   return document.getElementsByTagName('base')[0].href;
// }

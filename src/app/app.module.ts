// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Platform Modules
import { ApplicationRef, DoBootstrap, NgModule, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// App Root
import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Feature Modules
import { FeatureModule } from './modules/feature/feature.module';

// Stack Modules
import { StackModule } from './modules/stack/stack.module';

// Service Modules
import { AppConfigModule } from './modules/app-config/app-config.module';

// Auxiliary
import { TruncatorServiceFactory } from './factories/truncator/truncator.service.factory';
import { SorterServiceFactory } from './factories/sorter/sorter.service.factory';

// Cross-cutting concerns
import { Logger } from './classes/logger/logger';
import { ConsoleLoggerService } from './services/console-logger/console-logger.service';

// Bootstrap
import { ConfigService } from './services/config/config.service';

// Styling
import { StylesheetsComponent } from './components/stylesheets/stylesheets.component';

/** The main application module. */
@NgModule({
  declarations: [
    // App Root
    AppComponent,

    // Styling
    StylesheetsComponent,
  ],
  imports: [
    // Platform Modules
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Routing Module
    AppRoutingModule,

    // Feature Modules
    FeatureModule,

    // Stack Modules
    StackModule,

    // Service Modules
    AppConfigModule,
  ],
  providers: [
    // Platform Modules
    provideZonelessChangeDetection(),
    Title,

    // Auxiliary
    ...TruncatorServiceFactory.providers,
    ...SorterServiceFactory.providers,

    // Cross-cutting concerns
    { provide: Logger, useClass: ConsoleLoggerService },
  ],
  exports: [FormsModule, HttpClientModule],
})
export class AppModule implements DoBootstrap {
  /**
   * Constructs the app.
   * ~constructor
   *
   * @param configService The config service injected dependency.
   */
  constructor(
    public readonly configService: ConfigService,
  ) {
  }

  /** Bootstrap the app */
  ngDoBootstrap(appRef: ApplicationRef) {
    this.configService.fetchConfig().finally(() => appRef.bootstrap(AppComponent));
  }
}

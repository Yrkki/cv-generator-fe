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
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AppModule } from './app.module';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
// import { routes } from './app/app-routing.module';

// // import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// import { errorHandler } from './app/services/error-handler/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    provideClientHydration(),
  importProvidersFrom(AppModule)]
};

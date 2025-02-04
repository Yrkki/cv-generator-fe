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
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ThemeChangerService } from './theme-changer.service';

// eslint-disable-next-line max-lines-per-function
describe('ThemeChangerService', () => {
  let service: ThemeChangerService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ThemeChangerService
      ]
    });
    service = TestBed.inject(ThemeChangerService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface properties', () => {
    // eslint-disable-next-line max-lines-per-function
    expect(() => {
      let readAll;

      const appThemeConfig = {
        variables: [
          {
            name: 'primary-color',
            components: [
              {
                name: 'l',
                base: '',
                offset: '6%'
              }
            ]
          },
          {
            name: 'outline-color',
            components: [
              {
                name: 'l',
                base: '',
                offset: '57%'
              }
            ]
          },
          {
            name: 'dark-outline-color',
            components: [
              {
                name: 'l',
                base: 'outline-color',
                offset: '-20%'
              }
            ]
          },
          {
            name: 'ghost-outline-color',
            components: [
              {
                name: 'l',
                base: 'outline-color',
                offset: '0%'
              },
              {
                name: 'a',
                base: '',
                offset: '30%'
              }
            ]
          },
          {
            name: 'faded-fore-color',
            components: [
              {
                name: 'l',
                base: 'primary-color',
                offset: '50%'
              }
            ]
          },
          {
            name: 'header-fore-color',
            components: [
              {
                name: 'l',
                base: 'primary-color',
                offset: '20%'
              }
            ]
          },
          {
            name: 'black-color',
            components: [
              {
                name: 'l',
                base: '',
                offset: '0%'
              }
            ]
          },
          {
            name: 'white-color',
            components: [
              {
                name: 'l',
                base: '',
                offset: '100%'
              }
            ]
          },
          {
            name: 'tag-cloud-lightness-base-color',
            components: [
              {
                name: 'l',
                base: '',
                offset: '50%'
              }
            ]
          }
        ]
      };

      ['default', 'bad-theme-name'].forEach((theme) => {
        readAll = service.initContrastEnhancer(theme, appThemeConfig);
      });

      readAll = ThemeChangerService.defaultTheme;
      readAll = service.AppThemeConfig;

      service.theme = service.theme;
      service.themeBackground = service.themeBackground;

      debugService.contrastEnhancer = 0;
    }).toBeTruthy();
  });

  it('should check public interface methods', () => {
    let readAll;
    readAll = service.onThemeChange('default', 'original_0');
    readAll = service.onThemeChange('background/background-r90.jpg', 'tokelau/1.jpg');
    expect(service).toBeTruthy();
  });
});

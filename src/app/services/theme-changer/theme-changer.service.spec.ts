import { TestBed, inject } from '@angular/core/testing';

import { ThemeChangerService } from './theme-changer.service';

describe('ThemeChangerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeChangerService]
    });
  });

  it('should be created', inject([ThemeChangerService], (service: ThemeChangerService) => {
    expect(service).toBeTruthy();
  }));

  it('should check public interface', inject([ThemeChangerService], (service: ThemeChangerService) => {
    expect(() => {
      let readAll;
      readAll = service.initContrastEnhancer('default',
        {
          'variables': [
            {
              'name': 'primary-color',
              'components': [
                {
                  'name': 'l',
                  'base': '',
                  'offset': '6%'
                }
              ]
            },
            {
              'name': 'outline-color',
              'components': [
                {
                  'name': 'l',
                  'base': '',
                  'offset': '57%'
                }
              ]
            },
            {
              'name': 'dark-outline-color',
              'components': [
                {
                  'name': 'l',
                  'base': 'outline-color',
                  'offset': '-20%'
                }
              ]
            },
            {
              'name': 'ghost-outline-color',
              'components': [
                {
                  'name': 'l',
                  'base': 'outline-color',
                  'offset': '0%'
                },
                {
                  'name': 'a',
                  'base': '',
                  'offset': '30%'
                }
              ]
            },
            {
              'name': 'faded-fore-color',
              'components': [
                {
                  'name': 'l',
                  'base': 'primary-color',
                  'offset': '50%'
                }
              ]
            },
            {
              'name': 'header-fore-color',
              'components': [
                {
                  'name': 'l',
                  'base': 'primary-color',
                  'offset': '20%'
                }
              ]
            },
            {
              'name': 'black-color',
              'components': [
                {
                  'name': 'l',
                  'base': '',
                  'offset': '0%'
                }
              ]
            },
            {
              'name': 'white-color',
              'components': [
                {
                  'name': 'l',
                  'base': '',
                  'offset': '100%'
                }
              ]
            },
            {
              'name': 'tag-cloud-lightness-base-color',
              'components': [
                {
                  'name': 'l',
                  'base': '',
                  'offset': '50%'
                }
              ]
            }
          ]
        }
      );

      readAll = service.defaultTheme;
      readAll = service.AppThemeConfig;

      service.theme = service.theme;
      service.themeBackground = service.themeBackground;

      readAll = service.onThemeChange('default', 'original_0');
      readAll = service.onThemeChange('background.jpg', 'tokelau/1.jpg');
    }).not.toThrowError();
  }));
});

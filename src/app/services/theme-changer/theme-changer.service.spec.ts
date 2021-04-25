import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ThemeChangerService } from './theme-changer.service';

// eslint-disable-next-line max-lines-per-function
describe('ThemeChangerService', () => {
  let service: ThemeChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ThemeChangerService
      ]
    });
    service = TestBed.inject(ThemeChangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface', () => {
    // eslint-disable-next-line max-lines-per-function
    expect(() => {
      let readAll;
      readAll = service.initContrastEnhancer('default',
        {
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
        }
      );

      readAll = ThemeChangerService.defaultTheme;
      readAll = service.AppThemeConfig;

      service.theme = service.theme;
      service.themeBackground = service.themeBackground;

      readAll = service.onThemeChange('default', 'original_0');
      readAll = service.onThemeChange('background.jpg', 'tokelau/1.jpg');
    }).not.toThrowError();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { Entity } from '../../interfaces/entities/entity';

// eslint-disable-next-line max-lines-per-function
describe('MapComponent', () => {
  let component: MapComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        MapComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const entity = { key: 'Country' } as Entity;
  const frequencies = [
    ['Bulgaria', { Count: 15, Percentage: 44, Lightness: 0 }],
    ['Norway', { Count: 10, Percentage: 29, Lightness: 20 }]
  ];
  const countriesVisited = ['Russia', 'Ukraine', 'Romania', 'Hungary', 'Slovakia', 'Finland', 'Estonia', 'Sweden', 'Norway',
    'Switzerland', 'UK', 'France', 'China', 'Greece', 'Austria', 'Turkey', 'Serbia', 'Macedonia', 'Belgium',
    'Netherlands', 'Germany', 'Czech Republic', 'Spain', 'Cyprus'];

  it('should drawMap', async () => {
    expect(async () => {
      [frequencies].forEach(async (f) => {
        debugComponent.portfolioService.getFrequenciesCache = () => f;
        [undefined, entity].forEach(async (e) => {
          const constCountry = 'Country';
          debugComponent.mapService.model.portfolioModel.entities[constCountry] = e;
          [undefined, countriesVisited].forEach(async (c) => {
            const countries = 'Countries visited';
            debugComponent.mapService.model.portfolioModel.cv[countries] = c;
            [undefined, document.createElement('div')].forEach(async (_) => {
              component.mapHTMLElement = _;
              await component.drawMap();

              if (_) { globalThis.dispatchEvent(new Event('resize')); }
            });
          });
        });
      });
    }).not.toThrowError();
  });

  it('should resize window', () => {
    expect(() => {
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrowError();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrowError();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      // globalThis.print();
      const readAll = component.onBeforePrint(new Event('print'));
      globalThis.dispatchEvent(new KeyboardEvent('keypress', { key: 'Escape' }));
    }).not.toThrowError();
  });

  it('should check all public properties', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      readAll = component.map;
      readAll = component.mapHTMLElement;
    }).not.toThrowError();
  });

  it('should check all public methods', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.onSearchTokenChanged();

      readAll = debugComponent.purgeOldMap();
      readAll = component.drawMap();
      if (component.map) {
        component.map.nativeElement = undefined;
      }
      readAll = debugComponent.purgeOldMap();
      readAll = component.drawMap();
      component.map = undefined;
      readAll = debugComponent.purgeOldMap();
      readAll = component.drawMap();

      debugComponent.engine.searchService.searchTokenChanged$.emit('kon');

      debugComponent.searchTokenSubscription = undefined;
      // tslint:disable-next-line: no-lifecycle-call
      readAll = component.ngOnDestroy();
    }).not.toThrowError();
  });
});

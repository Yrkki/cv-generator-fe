import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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

  it('should drawMap', async () => {
    expect(async () => {
      const entity = { key: 'Country' };
      const frequencies = [
        [ 'Bulgaria', { Count: 15, Percentage: 44, Lightness: 0 } ],
        [ 'Norway', { Count: 10, Percentage: 29, Lightness: 20 } ]
      ];
      const countriesVisited = ['Russia', 'Ukraine', 'Romania', 'Hungary', 'Slovakia', 'Finland', 'Estonia', 'Sweden', 'Norway',
        'Switzerland', 'UK', 'France', 'China', 'Greece', 'Austria', 'Turkey', 'Serbia', 'Macedonia', 'Belgium',
        'Netherlands', 'Germany', 'Czech Republic', 'Spain', 'Cyprus'];

      await component.drawMap(entity, frequencies, countriesVisited);
      await component.drawMap(entity, frequencies);
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
      readAll = debugComponent.onSearchTokenChanged();
    }).not.toThrowError();
  });
});

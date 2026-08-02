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
// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        MapComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  });

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
    let drawCount = 0;

    for (const f of [frequencies]) {
      debugComponent.portfolioService.getFrequenciesCache = () => f;
      for (const e of [undefined, entity]) {
        const constCountry = 'Country';
        debugComponent.mapService.model.entities[constCountry] = e;
        for (const c of [undefined, countriesVisited]) {
          const countries = 'Countries visited';
          debugComponent.mapService.model.cv[countries] = c;
          for (const _ of [undefined, document.createElement('div')]) {
            component.mapHTMLElement = _;

            await expect(async () => {
              await component.drawMap();
            }).not.toThrow();

            drawCount++;

            if (_) { globalThis.dispatchEvent(new Event('resize')); }
          }
        }
      }
    }

    // Expect all 8 permutations (1x2x2x2) to have completed successfully
    expect(drawCount).toBe(8);
  });

  it('should resize window', () => {
    expect(() => {
      globalThis.dispatchEvent(new Event('resize'));
    }).not.toThrow();
  });

  it('should check onResize', () => {
    expect(() => {
      const readAll = component.onResize();
    }).not.toThrow();
  });

  it('should check onBeforePrint', () => {
    expect(() => {
      // globalThis.print();
      const readAll = component.onBeforePrint(new Event('print'));
      globalThis.dispatchEvent(new KeyboardEvent('keypress', { key: 'Escape' }));
    }).not.toThrow();
  });

  it('should check all public properties', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      readAll = component.map;
      readAll = component.mapHTMLElement;
    }).not.toThrow();
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
    }).not.toThrow();
  });
});

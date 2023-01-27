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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { Observable, of } from 'rxjs';

import { GeolocationComponent } from './geolocation.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocationComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check Geolocation dependent members', () => {
    expect(() => {
      let readAll;

      [
        { location: component } as unknown as Geolocation,
        { location: undefined } as unknown as Geolocation,
      ].forEach((_) => {
        component.Geolocation = _;
        readAll = component.GeolocationCountry;
        readAll = component.GeolocationFlagEmoji;
        readAll = component.GeolocationIsEu;
        readAll = debugComponent.onGetGeolocation(debugComponent.geolocation);
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      component.Geolocation = component.Geolocation;

      let readAll;
      readAll = component.divider;
      readAll = component.GeolocationCity;
      readAll = component.GeolocationCountry;
      readAll = component.GeolocationFlag;
      readAll = component.GeolocationFlagEmoji;
      readAll = component.GeolocationFlagEu;
      readAll = component.GeolocationFlagEuEmoji;
      readAll = component.GeolocationIP;
      readAll = component.GeolocationIpType;
      readAll = component.GeolocationIsEu;
      readAll = component.GeolocationUrl;
      readAll = component.ShowDivider = false;
      readAll = component.space;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    let readAll;
    readAll = debugComponent.getGeolocation();
    debugComponent.geolocationService.getGeolocation = (): Observable<any> => { return of({}); };
    readAll = debugComponent.getGeolocation();

    readAll = debugComponent.onGetGeolocation(debugComponent.geolocation);
    expect(component).toBeTruthy();
  });
});

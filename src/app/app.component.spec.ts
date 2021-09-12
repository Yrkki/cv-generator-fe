// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ApplicationRef, NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { TestingCommon } from './classes/testing-common/testing-common.spec';

import { AppComponent } from './app.component';

import { AppModule } from './app.module';

import { ContextConfiguration } from './interfaces/context/context-configuration';

import { ConfigService } from './services/config/config.service';

import { errorHandler } from './services/error-handler/error-handler.service';

// eslint-disable-next-line max-lines-per-function, max-statements
describe('AppComponent', () => {
  let component: AppComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    debugComponent.appService.uiService.windowReload = TestingCommon.mockWindowReload;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cv-generator-fe'`, () => {
    expect(component.title).toEqual('cv-generator-fe');
  });

  it(`should have a theme`, () => {
    const theme = debugComponent.themeChangerService.theme;
    debugComponent.themeChangerService.theme = 'default';
    expect(debugComponent.themeChangerService.theme).toBeTruthy();
    debugComponent.themeChangerService.theme = theme;
  });

  it(`should have a theme background`, () => {
    const themeBackground = debugComponent.themeChangerService.themeBackground;
    debugComponent.themeChangerService.themeBackground = 'background.jpg';
    expect(debugComponent.themeChangerService.themeBackground).toBeTruthy();
    debugComponent.themeChangerService.themeBackground = themeBackground;
  });

  it('should initialize', () => {
    expect(() => {
      const cvGeneratorAuditing = environment.CV_GENERATOR_AUDITING;
      environment.CV_GENERATOR_AUDITING = true;
      debugComponent.Initialize();
      environment.CV_GENERATOR_AUDITING = false;
      debugComponent.Initialize();
      environment.CV_GENERATOR_AUDITING = cvGeneratorAuditing;
    }).not.toThrowError();
  });

  it('should test onBeforeUnload handler', () => {
    expect(() => {
      debugComponent.onBeforeUnload();
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);

      debugComponent.beforePrintHandler();
      debugComponent.themeChangerService.theme = 'print';
      debugComponent.beforePrintHandler();

      debugComponent.afterPrintHandler();
    }).not.toThrowError();
  });

  it('should navigate routes', waitForAsync(() => {
    const location = TestBed.inject(Location);

    const router = TestBed.inject(Router);
    fixture.ngZone?.run(() => router.initialNavigation());

    // console.log('Info: location.path: ' + location.path());
    [...new Set(router.config)].forEach(async (route) => {
      if (route.path) {
        // console.log('Info: Checking route: ' + route.path);
        // // fixture.ngZone?.run(() => router.navigateByUrl('/' + route.path));
        // // // tick();
        // // // fixture.detectChanges();

        if (typeof route.loadChildren === 'function') {
          fixture.ngZone?.run(() => router.navigateByUrl(location.path()));
          expect(typeof await route.loadChildren()).toBe(typeof NgModule);
        }
      }
    });
  }));

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const contextConfiguration: ContextConfiguration = {
        width: '10px',
        backgroundColor: 'blue',
        name: () => 'component context configuration name'
      };
      [false, true].forEach((context) => {
        [false, true].forEach((tinted) => {
          debugComponent.persistenceService.setItem('context', context.toString());
          debugComponent.persistenceService.setItem('tinted', tinted.toString());
          readAll = component.onNavStateChanged(contextConfiguration);
        });
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.themeChangerService;
      readAll = debugComponent.themeChangerService.theme;
      readAll = debugComponent.themeChangerService.themeBackground;
      readAll = component.main;

      readAll = component.microprinted;
      readAll = component.tinted;
      readAll = component.context;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      [true, false].forEach((_) => {
        const readAll = debugComponent.refreshUI(_);
      });
    }).not.toThrowError();
  });

  it('should check app module bootstrap', () => {
    expect(() => {
      (AppModule.prototype as any).configService = TestBed.inject(ConfigService);
      try {
        AppModule.prototype.ngDoBootstrap({ bootstrap: () => { } } as unknown as ApplicationRef);
      } catch (err) { errorHandler.silentErrorHandler(err); }
    }).not.toThrowError();
  });
});

import { waitForAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingCommon } from './classes/testing-common/testing-common';
import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cv-generator-fe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cv-generator-fe');
  });

  it(`should have a theme`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const theme = app.theme;
    app.theme = 'default';
    expect(app.theme).toBeTruthy();
    app.theme = theme;
  }));

  it(`should have a theme background`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const themeBackground = app.themeBackground;
    app.themeBackground = 'background.jpg';
    expect(app.themeBackground).toBeTruthy();
    app.themeBackground = themeBackground;
  }));

  it('should check for updates', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(() => {
      app.checkForUpdates();
    }).not.toThrowError();
  }));

  it('should initialize', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(() => {
      const cvGeneratorAuditing = environment.CV_GENERATOR_AUDITING;
      environment.CV_GENERATOR_AUDITING = true;
      app.Initialize();
      environment.CV_GENERATOR_AUDITING = false;
      app.Initialize();
      environment.CV_GENERATOR_AUDITING = cvGeneratorAuditing;
    }).not.toThrowError();
  }));

  it('should check lifecycle hooks', () => {
    expect(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      TestingCommon.checkLifecycleHooks(app);

      app.beforePrintHandler();
      app.afterPrintHandler();
      app.detectMedia(app.beforePrintHandler, app.afterPrintHandler);
    }).not.toThrowError();
  });

  it('should navigate routes', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const location = TestBed.inject(Location);

    const router = TestBed.inject(Router);
    fixture.ngZone?.run(() => router.initialNavigation());

    // console.log('Info: location.path: ' + location.path());
    [...new Set(router.config)].forEach(async route => {
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

  it('should check public interface', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(() => {
      let readAll;
      readAll = app.theme;
      readAll = app.themeBackground;

    }).not.toThrowError();
  });
});

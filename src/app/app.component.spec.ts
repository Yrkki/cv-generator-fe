import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingCommon } from './classes/testing-common/testing-common.spec';
import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';
import { ContextConfiguration } from './interfaces/context/context-configuration';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
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
    debugComponent.uiService.windowReload = TestingCommon.mockWindowReload;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cv-generator-fe'`, () => {
    expect(component.title).toEqual('cv-generator-fe');
  });

  it(`should have a theme`, waitForAsync(() => {
    const theme = component.theme;
    component.theme = 'default';
    expect(component.theme).toBeTruthy();
    component.theme = theme;
  }));

  it(`should have a theme background`, waitForAsync(() => {
    const themeBackground = component.themeBackground;
    component.themeBackground = 'background.jpg';
    expect(component.themeBackground).toBeTruthy();
    component.themeBackground = themeBackground;
  }));

  it('should check for updates', waitForAsync(() => {
    expect(() => {
      debugComponent.checkForUpdates();
    }).not.toThrowError();
  }));

  it('should initialize', waitForAsync(() => {
    expect(() => {
      const cvGeneratorAuditing = environment.CV_GENERATOR_AUDITING;
      environment.CV_GENERATOR_AUDITING = true;
      debugComponent.Initialize();
      environment.CV_GENERATOR_AUDITING = false;
      debugComponent.Initialize();
      environment.CV_GENERATOR_AUDITING = cvGeneratorAuditing;
    }).not.toThrowError();
  }));

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);

      debugComponent.beforePrintHandler();
      debugComponent.afterPrintHandler();
      debugComponent.detectMedia(debugComponent.beforePrintHandler, debugComponent.afterPrintHandler);
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

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = debugComponent.swUpdate;
      readAll = debugComponent.themeChangerService;
      readAll = component.theme;
      readAll = component.themeBackground;
      readAll = component.main;

      readAll = component.microprinted;
      readAll = component.tinted;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const contextConfiguration: ContextConfiguration = {
        width: '10px',
        backgroundColor: 'blue',
        name: () => 'component context configuration name'
      };
      readAll = component.onNavStateChanged(contextConfiguration);

      readAll = debugComponent.subscribeUiInvalidated();
      readAll = debugComponent.unsubscribeUiInvalidated();
      readAll = debugComponent.refreshUI();
      readAll = debugComponent.windowReload();
    }).not.toThrowError();
  });
});

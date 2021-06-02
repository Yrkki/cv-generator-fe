import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { FooterComponent } from './footer.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { DataService } from '../../services/data/data.service';

// eslint-disable-next-line max-lines-per-function
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugComponent: any;
  let dataService: DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        HttpClientModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => {
      component.Initialize();
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.headerComponents?.map((_) => _.clickable));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      const readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.saveToggle(new MouseEvent('click'));
      readAll = component.saveToggle(new MouseEvent('click', { ctrlKey: true }));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.version;
      readAll = component.Config;
      readAll = component.LeavesCount;
      readAll = component.qualifiedHostname;

      readAll = component.expandKey;
      component.Expand = component.Expand;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      TestingCommon.shouldCheckPublicInterface(component);

      let readAll;
      readAll = component.getAssetUri('');
      readAll = component.linkLabel('');
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      const readAll = debugComponent.getVersion();
    }).not.toThrowError();
  });
});

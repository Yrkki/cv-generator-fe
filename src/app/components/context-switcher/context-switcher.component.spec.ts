import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextSwitcherComponent } from './context-switcher.component';
import { Context } from '../../interfaces/context/context';
import { ContextConfiguration } from '../../interfaces/context/context-configuration';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common';
import { HttpClientModule } from '@angular/common/http';

describe('ContextSwitcherComponent', () => {
  let component: ContextSwitcherComponent;
  let fixture: ComponentFixture<ContextSwitcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSwitcherComponent);
    component = fixture.componentInstance;
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

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.sidenav, component.sidenav, component.sidenav]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.sidenav]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.NavState;
      readAll = component.contextService;
      component.contexts = component.contexts;
      readAll = component.inputService;
      component.isEditing = component.isEditing;
      component.navState = component.navState;
      readAll = component.navStateConfigurations;
      readAll = component.navStatePersistenceKey;
      readAll = component.persistenceService;
      component.selectedContext = component.selectedContext;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.Initialize();
      const context: Context = {
        id: 555,
        name: 'context name',
        storage: {} as Storage
      };
      readAll = component.getCaption(context);
      readAll = component.getTitle(context);
      readAll = component.toggleNav(new MouseEvent('empty'));
      readAll = component.toggleNavState();
      readAll = component.toggleNavState();
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      const contextConfiguration: ContextConfiguration = {
        width: '10px',
        backgroundColor: 'blue',
        name: () => 'context switcher context configuration name'
      };
      component.navStateChanged.emit(contextConfiguration);
    }).not.toThrowError();
  });
});

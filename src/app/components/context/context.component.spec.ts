import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextComponent } from './context.component';
import { Context } from '../../interfaces/context/context';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common';
import { HttpClientModule } from '@angular/common/http';

describe('ContextComponent', () => {
  let component: ContextComponent;
  let fixture: ComponentFixture<ContextComponent>;

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
    fixture = TestBed.createComponent(ContextComponent);
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
      TestingCommon.shouldSimulateMouseClick([component.clickableTab, component.input, component.clickableDelete]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableTab, component.input, component.clickableDelete]);
    }).not.toThrowError();
  });

  it('should test input logic', () => {
    expect(() => {
      component.clickableTab.nativeElement.click();
      if (component.input) {
        component.input.nativeElement.value = 'test context';
        component.input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.NavState;
      component.caption = component.caption;
      component.context = component.context;
      readAll = component.contextService;
      component.contexts = component.contexts;
      readAll = component.inputService;
      component.isEditing = component.isEditing;
      readAll = component.navState;
      readAll = component.persistenceService;
      component.selectedContext = component.selectedContext;
      component.title = component.title;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const context: Context = {
        id: 555,
        name: 'context name',
        storage: {} as Storage
      };
      readAll = component.contextEquals(context, context);
      readAll = component.onDelete(new MouseEvent('empty'));
      readAll = component.onSelect(new MouseEvent('empty'), context);
    }).not.toThrowError();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextComponent } from './context.component';
import { Context } from '../../interfaces/context/context';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { HttpClientModule } from '@angular/common/http';
import { ContextService } from '../../services/context/context.service';
import { UiService } from '../../services/ui/ui.service';
import { InputService } from '../../services/input/input.service';

// eslint-disable-next-line max-lines-per-function
describe('ContextComponent', () => {
  let component: ContextComponent;
  let debugComponent: any;
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextComponent);
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
      component.contextService.contexts = component.contextService.contexts;
      readAll = component.inputService;
      component.contextService.isEditing = component.contextService.isEditing;
      readAll = component.contextService.navState;
      component.contextService.selectedContext = component.contextService.selectedContext;
      component.title = component.title;
      readAll = component.uiService;

      readAll = debugComponent.newContext;
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

      readAll = debugComponent.nextId();
      readAll = debugComponent.new();
      readAll = debugComponent.delete(new ContextComponent(
        TestBed.inject(ContextService),
        TestBed.inject(UiService),
        TestBed.inject(InputService)));
    }).not.toThrowError();
  });
});

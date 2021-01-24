import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ExpandToggleComponent } from './expand-toggle.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpandToggleComponent', () => {
  let component: ExpandToggleComponent;
  let fixture: ComponentFixture<ExpandToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandToggleComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandToggleComponent);
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

  it('should simulate mouse click using keyboard at the expand decorated button', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableExpandDecorated]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the expand button', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableExpand]);
    }).not.toThrowError();
  });

  it('should toggle Expand', () => {
    expect(() => {
      const value = component.Expand;
      component.expandElement?.nativeElement.click();
      component.expandElement?.nativeElement.click();
      component.Expand = value;
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.ui;
      readAll = component.entities;
      readAll = component.decorations;
      readAll = component.key;
      readAll = component.expandKey;
      readAll = component.label('');
      readAll = component.uiText('');
    }).not.toThrowError();
  });
});

// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ToggleComponent } from './toggle.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppModule } from '../../app.module';

// eslint-disable-next-line max-lines-per-function
describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
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
      TestingCommon.shouldSimulateMouseClick([component.clickableToggle, component.inputToggle]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableToggle, component.inputToggle]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.toggleService.toggleKindValues;
      readAll = component.visibility;
      // readAll = component.ToggleKind;
      readAll = component.glyph;

      readAll = component.toggleKind;
      readAll = component.entityKey;
      readAll = component.context;

      readAll = component.toggleService.captions;
      readAll = component.toggleService.decorations;

      component.context = component.context;

      readAll = component.toggleService;
      readAll = component.inputService;
      readAll = component.persistenceService;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check public interface context dependent properties', () => {
    expect(() => {
      let readAll;
      [component.context, component].forEach((_) => {
        readAll = _?.position;
        readAll = _?.value;
        readAll = _?.displayValue;
        if (_?.model) { _.model = _.model; } else { readAll = _?.model; }
        readAll = _?.propertyName;
        readAll = _?.sliderClass;
      });
      readAll = component.context?.subject;
    }).not.toThrowError();
  });

  it('should check public interface toggleKind dependent properties', () => {
    expect(() => {
      let readAll;
      component.toggleService.toggleKindValues.forEach((toggleKind) => {
        component.toggleKind = toggleKind;

        readAll = fixture.debugElement.componentInstance.isSharedPropertyName;
        readAll = component.propertyName;
        readAll = fixture.debugElement.componentInstance.multiModel;
      });
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      component.modelChanged.emit({ sourceEntityKey: 'Language', value: true });
    }).not.toThrowError();
  });
});

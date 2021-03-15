import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { TruncatorComponent } from './truncator.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

import { AppModule } from '../../app.module';

describe('TruncatorComponent', () => {
  let component: TruncatorComponent;
  let fixture: ComponentFixture<TruncatorComponent>;

  const truncatorService: { [key: string]: TruncatorService } = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TruncatorComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
    TruncatorService.TruncatorKindValues.forEach(truncatorKind =>
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorService.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      )));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should test mouse click', () => {
    Object.values(truncatorService).forEach(service => {
      expect(() => {
        component.truncatorService = service;

        [
          component.clickableToggleDecorated,
          component.clickableToggleDecorated,
          component.clickableSlider,
          component.clickableSlider,
          component.clickableToggle,
          component.clickableToggle,

          component.clickableFocusThreshold,
        ].forEach(_ => _?.nativeElement.click());
      }).not.toThrowError();
    });
  });

  it('should simulate mouse click using keyboard at the expand button', () => {
    Object.values(truncatorService).forEach(service => {
      expect(() => {
        component.truncatorService = service;

        TestingCommon.shouldSimulateMouseClickUsingKeyboard([
          component.clickableToggleDecorated,
          component.toggleElement,
          component.clickableSlider,
          component.clickableToggle,

          component.clickableFocusThreshold,
          component.focusThresholdElement
        ]);
      }).not.toThrowError();
    });
  });

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach(service => {
      expect(() => {
        component.truncatorService = service;

        let readAll;
        component.truncatorKind = component.truncatorKind;
        component.truncatorService = component.truncatorService;
        readAll = component.entities;

        readAll = component.longTruncatorKind;

        readAll = component.tagCloudEmphasisDisplayValue;
        readAll = component.tagCloudEmphasisPropertyName;
        readAll = component.tagCloudEmphasisValue;
        readAll = component.tagCloudEmphasisContext;

        readAll = component.focusThresholdDisplayValue;
        readAll = component.focusThresholdPropertyName;
        readAll = component.focusThresholdValue;
        readAll = component.focusThresholdContext;

        readAll = component.TruncatorKind;
      }).not.toThrowError();
    });
  });
});

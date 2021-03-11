import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ProjectSummaryComponent } from './project-summary.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { SpectrumComponent } from '../spectrum/spectrum.component';

describe('ProjectSummaryComponent', () => {
  let component: ProjectSummaryComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<ProjectSummaryComponent>;
  let sorterService: SorterService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectSummaryComponent,
        { provide: APP_BASE_HREF, useValue: '/' },
        SpectrumComponent
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Spectrum,
        TestBed.inject(PortfolioService),
        TestBed.inject(EntitiesService),
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickables?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableIndex?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableMap?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
    }).not.toThrowError();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = component.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.entities;
      readAll = component.ui;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.decorations;
      readAll = component.tagCloud;

      readAll = component.TagCloudDisplayMode;

      readAll = component.tabName('');
      readAll = component.saveToggle(new MouseEvent('click'));

      const propertyName = 'Responsibilities';
      readAll = component.getFrequenciesCache(propertyName);

      const typeName = 'Project Summary';
      readAll = debugComponent.restoreToggle(document, typeName);
    }).not.toThrowError();
  });
});

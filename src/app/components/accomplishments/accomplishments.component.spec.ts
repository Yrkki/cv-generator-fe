import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { AccomplishmentsComponent } from './accomplishments.component';

import { AppModule } from '../../app.module';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

describe('AccomplishmentsComponent', () => {
  let component: AccomplishmentsComponent;
  let fixture: ComponentFixture<AccomplishmentsComponent>;
  let sorterService: SorterService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccomplishmentsComponent],
      imports: [
        AppModule
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Accomplishments,
        TestBed.inject(PortfolioService),
        TestBed.inject(EntitiesService),
        TestBed.inject(InputService),
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentsComponent);
    component = fixture.componentInstance;
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
      component.clickableAccomplishments?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableAccomplishmentTypes?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableAccomplishmentTypeIndex?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableAccomplishmentTypeList?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
      component.clickableAccomplishmentTypeChart?.forEach(_ => _.nativeElement.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter' })));
    }).not.toThrowError();
  });

  it('should check updateShouldCollapseProjectsAccomplishmentHandler handler', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishmentHandler(new MouseEvent('click'));
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
      readAll = component.updateShouldCollapseProjectsAccomplishment('Accomplishments');
      readAll = component.projectsDefined();
      readAll = component.filtered;
      readAll = component.filtered.Accomplishments;

      readAll = component.filtered.Languages;
      readAll = component.filtered.Certifications;
      readAll = component.filtered.Courses;
      readAll = component.filtered.Organizations;
      readAll = component.filtered.Volunteering;
      readAll = component.filtered.Vacation;

      readAll = component.filtered.Projects;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);

      readAll = component.remaining([]);
    }).not.toThrowError();
  });
});

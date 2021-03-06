import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ProjectListComponent } from './project-list.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { Project } from '../../interfaces/project/project';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let sorterService: SorterService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectListComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    sorterService = TestBed.inject(
      SorterService.InjectionToken(SorterKind.Projects,
        TestBed.inject(PortfolioService),
        TestBed.inject(EntitiesService),
        TestBed.inject(InputService),
        TestBed.inject(UiService),
        TestBed.inject(PersistenceService),
      ));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
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

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.sorter;
      readAll = component.entities;
      readAll = component.ui;
      readAll = component.filtered;
      readAll = component.dateFormat;
      readAll = component.componentName;
      readAll = component.getProjectIsOnePersonTeam({});
      readAll = component.getProjectIsOnePersonTeam({ 'Team size': 1 });
      readAll = component.getProjectIsOnePersonTeam({ 'Team size': 5 });
      readAll = component.getDecryptedProjectPeriod({});
      readAll = component.getJsDateValueFromExcel(12345);
      readAll = component.toTitleCase('test');
      readAll = component.trackByFn(0, 0);

      ['test project', 'Database applications'].forEach(_ =>
        readAll = component.frequency({ 'Project name': _ } as Project)
      );

      readAll = component.remaining([]);
    }).not.toThrowError();
  });
});

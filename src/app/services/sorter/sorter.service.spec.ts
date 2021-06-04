import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { SortOrder } from '../../enums/sort-order.enum';
import { Go } from '../../enums/go.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('SorterService', () => {
  const sorterService: { [key: string]: SorterService } = {
    Accomplishments: {} as SorterService,
    Publications: {} as SorterService,
    Spectrum: {} as SorterService,
    Projects: {} as SorterService
  };

  let uiService: UiService;
  let persistenceService: PersistenceService;
  let portfolioModel: PortfolioModel;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    SorterServiceFactory.SorterKindValues.forEach((sorterKind) => {
      sorterService[SorterKind[sorterKind]] = TestBed.inject(SorterServiceFactory.InjectionToken(sorterKind,
        uiService = TestBed.inject(UiService),
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
    portfolioModel = TestBed.inject(PortfolioModel);
    await TestBed.inject(MockDataService).getProjects().pipe(take(1)).subscribe((projects: any) => {
      portfolioModel.projects = projects;
    });
  }));

  it('should be created', () => {
    Object.values(sorterService).forEach((service) => {
      expect(service).toBeTruthy();
    });
  });

  it('should check next sort and title methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;

        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          readAll = service.nextSort(new MouseEvent('click'), _);
          readAll = service.nextSortTitle(_);
        });
      }).not.toThrowError();
    });
  });

  it('should check next potential sort field method', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        const debugService = service as any;

        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          [SortOrder.Ascending, SortOrder.Descending].forEach((sortOrder) => {
            if (service.sorterKind === SorterKind.Accomplishments) {
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            } else if (service.sorterKind === SorterKind.Spectrum) {
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
              readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            }
          });
        });
      }).not.toThrowError();
    });
  });

  it('should check potential sort field to next adjacent one method', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        const debugService = service as any;

        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          [SortOrder.Ascending, SortOrder.Descending].forEach((sortOrder) => {
            readAll = debugService.nudgePotentialSortField(0, sortOrder, _);
            readAll = debugService.nudgePotentialSortField(0, sortOrder, _);
            readAll = debugService.nudgePotentialSortField(0, sortOrder, _);
          });
        });
      }).not.toThrowError();
    });
  });

  it('should check public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        service.sorterKind = service.sorterKind;

        service.sortFieldIndex = service.sortFieldIndex;
        service.sortOrder = service.sortOrder;

        readAll = SorterServiceFactory.SorterKindValues;
        readAll = SorterServiceFactory.providers;
      }).not.toThrowError();
    });
  });

  it('should check subSortField public interface properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = service.subSortField;
        readAll = service.subSortField.full;
        readAll = service.subSortField.sFull;
        readAll = service.subSortField.indexFull;
        readAll = service.subSortField.indexOrderFull;
        [service.sortOrder, SortOrder.Ascending, SortOrder.Descending].forEach(
          (_) => { readAll = service.subSortField.orderDirection[_]; });
        [Go.Home, Go.Back, Go.Forward].forEach((_) => { readAll = service.subSortField.indexNextDirection[_]; });

        readAll = service.subSortField.defaults;
        service.sorterKind = -1 as SorterKind;
        readAll = service.subSortField.defaults;
      }).not.toThrowError();
    });
  });

  it('should check private properties', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        const debugService = service as any;
        debugService.sortFields = debugService.sortFields;
      }).not.toThrowError();
    });
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check the sorted method', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        const debugService = service as any;

        const sortField = service.sortField(service.sortFieldIndex);
        const sortOrder = 2 * service.sortOrder - 1;
        if (service.sorterKind === SorterKind.Projects) {
          readAll = service.sorted(null as any);
          readAll = service.sorted(portfolioModel.projects);
          readAll = service.sorted(portfolioModel.projects, sortField);
          readAll = service.sorted(portfolioModel.projects, sortField, sortOrder);

          readAll = debugService.sortFunctional(portfolioModel.projects[0], portfolioModel.projects[0], sortField, sortOrder);
          readAll = debugService.sortFunctional(portfolioModel.projects[0], portfolioModel.projects[1], sortField, sortOrder);
          readAll = debugService.sortFunctional(portfolioModel.projects[1], portfolioModel.projects[0], sortField, sortOrder);
        } else if (service.sorterKind === SorterKind.Spectrum) {
          readAll = debugService.sortFunctional(
            ['some', { Count: 1, Significance: 1 }],
            ['other', { Count: 2, Significance: 2 }],
            sortField, sortOrder);
        }
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = SorterServiceFactory.tokenDescription(SorterKind.Accomplishments);
        SorterServiceFactory.SorterKindValues.forEach((sorterKind) => {
          const deps = [uiService, persistenceService];
          readAll = SorterServiceFactory.InjectionToken(sorterKind, deps);
          readAll = SorterServiceFactory.useFactory(sorterKind, deps);
        });
        readAll = service.sortField(1);
        readAll = service.sortField(0);
        readAll = service.sortField(-1);
      }).not.toThrowError();
    });
  });

  it('should check private methods', () => {
    Object.values(sorterService).forEach((service) => {
      expect(() => {
        let readAll;
        const debugService = service as any;

        readAll = debugService.clamp (11, 10);
        readAll = debugService.clamp (-11, 10);
        readAll = debugService.clamp (11, 0);
      }).not.toThrowError();
    });
  });
});

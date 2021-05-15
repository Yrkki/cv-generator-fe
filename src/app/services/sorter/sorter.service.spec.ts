import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { SorterKind } from '../../enums/sorter-kind.enum';
import { SortOrder } from '../../enums/sort-order.enum';
import { Go } from '../../enums/go.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';
import { UiService } from '../../services/ui/ui.service';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    SorterServiceFactory.SorterKindValues.forEach((sorterKind) => {
      sorterService[SorterKind[sorterKind]] = TestBed.inject(SorterServiceFactory.InjectionToken(sorterKind,
        uiService = TestBed.inject(UiService),
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
  });

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

        [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
          const debugService = service as any;
          [SortOrder.Ascending, SortOrder.Descending].forEach((sortOrder) => {
            service.sorterKind = SorterKind.Accomplishments;
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            service.sorterKind = SorterKind.Spectrum;
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
            readAll = debugService.nextPotentialSortField(0, sortOrder, _);
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
        readAll = service.subSortField;
        readAll = service.subSortField.full;
        readAll = service.subSortField.sFull;
        readAll = service.subSortField.indexFull;
        readAll = service.subSortField.indexOrderFull;
        readAll = service.subSortField.defaults;
        service.sortFieldIndex = service.sortFieldIndex;
        service.sortOrder = service.sortOrder;
        readAll = service.isInNaturalOrder;
        readAll = service.subSortField.orderDirection[service.sortOrder];
        readAll = service.subSortField.orderDirection[SortOrder.Ascending];
        readAll = service.subSortField.orderDirection[SortOrder.Descending];
        [Go.Home, Go.Back, Go.Forward].forEach((_) => { readAll = service.subSortField.indexNextDirection[_]; });

        readAll = SorterServiceFactory.SorterKindValues;
        readAll = SorterServiceFactory.providers;
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

        readAll = service.sorted([]);
        readAll = service.sorted([], service.sortField(service.sortFieldIndex), 2 * service.sortOrder - 1);
        readAll = service.sorted([], service.sortField(service.sortFieldIndex));
      }).not.toThrowError();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PromptUpdateService } from './prompt-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

describe('PromptUpdateService', () => {
  let service: PromptUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', { enabled: false }),
        HttpClientModule,
      ],
      providers: [PromptUpdateService]
    });
    service = TestBed.inject(PromptUpdateService);
    service.windowReload = TestingCommon.mockWindowReload;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.windowReload();
    }).not.toThrowError();
  });
});

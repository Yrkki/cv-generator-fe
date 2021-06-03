import { TestBed } from '@angular/core/testing';
import { UpdateAvailableEvent } from '@angular/service-worker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PromptUpdateService } from './prompt-update.service';

// eslint-disable-next-line max-lines-per-function
describe('PromptUpdateService', () => {
  let service: PromptUpdateService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', { enabled: false }),
        HttpClientModule,
      ],
      providers: [PromptUpdateService]
    });
    service = TestBed.inject(PromptUpdateService);
    debugService = service as any;

    service.uiService.windowReload = TestingCommon.mockWindowReload;
    TestingCommon.disableLogging();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugService.promptUser(undefined);
      readAll = debugService.activateUpdate();

      readAll = debugService.reportUpdate();

      readAll = debugService.onUpdateAvailableEvent({} as UpdateAvailableEvent);
      debugService.promptUser = () => false;
      readAll = debugService.onUpdateAvailableEvent({} as UpdateAvailableEvent);

      readAll = service.windowReload();
    }).not.toThrowError();
  });
});

import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { take } from 'rxjs/operators';
import { UiService } from '../ui/ui.service';

/**
 * The progressive web app update prompt service.
 */
@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {
  /**
   * Constructs the update prompt.
   * ~constructor
   *
   * @param swUpdate The injected software updater.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    private readonly swUpdate: SwUpdate,
    public readonly uiService: UiService,
  ) {
    swUpdate.available.pipe(take(1)).subscribe((event) => {
      if (this.promptUser(event)) {
        swUpdate.activateUpdate()
          .then(() => {
            // console.log('Debug: [App] activateUpdate completed');
            this.windowReload();
          })
          .catch((err) => {
            // console.error(err);
          });
      }
    });
  }

  /**
   * Prompt the user.
   * @param _event The event to notify about.
   *
   * @returns User consent.
   */
  // tslint:disable-next-line: variable-name
  private promptUser(_event: UpdateAvailableEvent): boolean { return true; }

  /** Reload window delegate. */
  public windowReload() { this.uiService.windowReload(); }
}

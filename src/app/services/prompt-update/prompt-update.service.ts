import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

/**
 * The progressive web app update prompt service.
 */
@Injectable()
export class PromptUpdateService {

  /**
   * Constructs the update prompt.
   * @constructor
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (this.promptUser(event)) {
        swUpdate.activateUpdate()
          .then(() => {
            console.log('[App] activateUpdate completed');
            document.location.reload();
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  }

  /**
   * Prompt the user.
   * @param event The event to notify about.
   */
  private promptUser(event): void { }
}

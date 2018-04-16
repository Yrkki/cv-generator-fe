import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PromptUpdateService {

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

  private promptUser(event): void { }
}

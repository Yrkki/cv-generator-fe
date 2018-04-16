import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/observable/interval';

@Injectable()
export class CheckForUpdateService {

  constructor(private swUpdate: SwUpdate) {
    interval(1 * 60 * 60).subscribe(() => swUpdate.checkForUpdate()
      .then(() => {
        console.log('[App] checkForUpdate completed');
      })
      .catch(err => {
        console.error(err);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { logger } from '../logger/logger.service';

/**
 * An input service.
 */
@Injectable({
  providedIn: 'root'
})
export class InputService {
  /**
   * Simulate keyboard clicks.
   *
   * @param keyboardEvent The keyboard event.
   */
  public keypress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent) { return; }

    if (keyboardEvent.key === 'Enter') {
      if (keyboardEvent.target) {
        const href = (keyboardEvent.target as HTMLAnchorElement).href;
        if (href) {
          logger.debug(`InputService: keypress: Skipping href: ${href}`);
        } else {
          keyboardEvent.target.dispatchEvent(new MouseEvent('click'));
        }
      }
    }
  }
}

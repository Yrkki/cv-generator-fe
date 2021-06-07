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
   * @param event The keyboard event.
   */
  public keypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.processKeypressEnter(event);
    }
  }

  /** Process keypress enter. */
  private processKeypressEnter(event: KeyboardEvent) {
    if (event.target) {
      const href = (event.target as HTMLAnchorElement).href;
      if (href) {
        logger.debug(`InputService: keypress: Skipping href: ${href}`);
      } else {
        event.target.dispatchEvent(new MouseEvent('click'));
      }
    }
  }
}

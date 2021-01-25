import { Injectable } from '@angular/core';

/**
 * An input service.
 */
@Injectable({
  providedIn: 'root'
})
export class InputService {
  /**
   * Simulate keyboard clicks.
   * @param keyboardEvent The keyboard event.
   */
  public keypress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent) { return; }

    if (keyboardEvent.key === 'Enter') {
      if (keyboardEvent.target) {
        keyboardEvent.target.dispatchEvent(new MouseEvent('click'));
      }
    }
  }
}

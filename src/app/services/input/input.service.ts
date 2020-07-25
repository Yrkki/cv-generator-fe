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
   * @param event The keyboard event.
   */
  public keypress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (event.target) {
          event.target.dispatchEvent(new MouseEvent('click'));
        }
        break;
    }
  }
}

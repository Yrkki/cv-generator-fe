import { Component, Input } from '@angular/core';

/**
 * Selector component
 */
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  /** The component text */
  @Input() public text = '';
}

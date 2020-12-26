import { Component } from '@angular/core';

import { UiService } from '../../services/ui/ui.service';
import { ThemeChangerService } from '../../services/theme-changer/theme-changer.service';

/**
 * Theme changer component
 */
@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss']
})
export class ThemeChangerComponent {
  /**
   * Constructs the theme changer component.
   * ~constructor
   *
   * @param uiService The ui service injected dependency.
   * @param themeChangerService The theme changer service dependency.
   */
  constructor(
    public uiService: UiService,
    public themeChangerService: ThemeChangerService
  ) {
  }
}

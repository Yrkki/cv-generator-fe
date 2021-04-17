import { Component, Input, ViewChild, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ToggleComponent } from '../toggle/toggle.component';
import { MultiToggleComponent } from '../multi-toggle/multi-toggle.component';
import { TruncatorComponent } from '../truncator/truncator.component';

/**
 * Toolbar component.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /** The component key */
  @Input() public key = 'Toolbar';

  /** Toggles */
  @Input() public toggles: ToggleKind[] = [];

  /** Instanct search model changed event emitter. */
  @Output() public readonly instantSearchModelChanged = new EventEmitter<boolean>();

  /** Truncator kind getter. */
  public get truncatorKind() {
    return this.key === 'Curriculum Vitae' ? TruncatorKind.Cv
      : this.key === 'Project Summary' ? TruncatorKind.Ps
        : this.key === 'Project Portfolio' ? TruncatorKind.Pp
          : -1 as TruncatorKind;
  }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Toggle component. */
  @ViewChildren(ToggleComponent) toggleComponents!: QueryList<ToggleComponent>;

  /** Instant search toggle element. */
  @ViewChild('instantSearchToggle') instantSearchToggle!: ToggleComponent;

  /** Content columns toggle element. */
  @ViewChild('contentColumnsToggle') contentColumnsToggle!: ToggleComponent;
  /** Layout columns toggle element. */
  @ViewChild('layoutColumnsToggle') layoutColumnsToggle!: ToggleComponent;

  /** Expand toggle element. */
  @ViewChild('expandToggle') expandToggle!: ToggleComponent;

  /** Pagination toggle element. */
  @ViewChild('tagCloudEmphasisTruncator') tagCloudEmphasisTruncator!: TruncatorComponent;
  /** Pagination toggle element. */
  @ViewChild('tagCloudDisplayModeMultiToggle') tagCloudDisplayModeMultiToggle!: MultiToggleComponent;

  /** Pagination toggle element. */
  @ViewChild('paginationToggle') paginationToggle!: ToggleComponent;
  /** Decorations toggle element. */
  @ViewChild('decorationsToggle') decorationsToggle!: ToggleComponent;
  /** Edit mode toggle element. */
  @ViewChild('editModeToggle') editModeToggle!: ToggleComponent;

  /**
   * Constructs the Toolbar component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
  ) { }
}

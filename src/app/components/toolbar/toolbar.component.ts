import { Component, Input, ViewChild, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

import { ToolbarService } from '../../services/toolbar/toolbar.service';

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

  /** Responsive changed event emitter. */
  @Output() public get responsiveModelChanged() { return this.toolbarService.responsiveModelChanged$; }

  /** Тinted model changed event emitter. */
  @Output() public readonly tintedModelChanged = new EventEmitter<boolean>();

  /** Truncator kind getter. */
  public get truncatorKind() {
    return this.key === 'Curriculum Vitae' ? TruncatorKind.Cv
      : this.key === 'Project Summary' ? TruncatorKind.Ps
        : this.key === 'Project Portfolio' ? TruncatorKind.Pp
          : -1 as TruncatorKind;
  }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Whether toolbar collapsed toggle is checked. */
  public get toolbarCollapsedToggleChecked() { return this.toolbarCollapsedToggle?.inputToggle?.nativeElement?.checked; }

  /** Whether toolbar collapsed toggle is checked. */
  public get toggleClass() { return this.toolbarCollapsedToggleChecked ? 'toolbar-in reverse' : 'toolbar-in'; }

  /** Toggle component. */
  @ViewChildren(ToggleComponent) toggleComponents!: QueryList<ToggleComponent>;
  /** Toolbar collapsed toggle element. */
  @ViewChild('toolbarCollapsedToggle') toolbarCollapsedToggle!: ToggleComponent;

  /** Tag cloud emphasis truncator element. */
  @ViewChild('tagCloudEmphasisTruncator') tagCloudEmphasisTruncator!: TruncatorComponent;
  /** Tag cloud display mode multi-toggle element. */
  @ViewChild('tagCloudDisplayModeMultiToggle') tagCloudDisplayModeMultiToggle!: MultiToggleComponent;

  /**
   * Constructs the Toolbar component.
   * ~constructor
   *
   * @param toolbarService The toolbar service injected dependency.
   */
  constructor(
    private readonly toolbarService: ToolbarService,
  ) { }
}

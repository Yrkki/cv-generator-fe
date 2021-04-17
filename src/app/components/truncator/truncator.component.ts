import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';
import { ToggleComponent } from '../toggle/toggle.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * Truncator component
 */
@Component({
  selector: 'app-truncator',
  templateUrl: './truncator.component.html',
  styleUrls: ['./truncator.component.scss']
})
export class TruncatorComponent {
  /** The truncator kind. */
  #truncatorKind!: TruncatorKind;
  /** Truncator kind getter. */
  public get truncatorKind() {
    return this.#truncatorKind;
  }
  /** Truncator kind setter. */
  @Input() public set truncatorKind(value) {
    if (this.#truncatorKind !== value) {
      this.#truncatorKind = value;

      // initialize the truncatorService
      this.Initialize();
    }
  }

  /** The proper truncator service to use. */
  public truncatorService?: TruncatorService;

  /** Truncator kind enum accessor. */
  public get TruncatorKind() { return TruncatorKind; }
  /** Long truncator kind. */
  public get longTruncatorKind() {
    return this.truncatorKind === TruncatorKind.Cv ? this.portfolioService.entities['Curriculum Vitae']?.section
      : this.truncatorKind === TruncatorKind.Ps ? this.portfolioService.entities['Project Summary']?.section
        : this.truncatorKind === TruncatorKind.Pp ? this.portfolioService.entities['Project Portfolio']?.section
          : '';
  }

  /** Context. */
  @Input() public context?: {
    value?: string;
    displayValue?: string;
    model?: number;
    propertyName?: string;
  };
  /** Focus threshold value. */
  public get value() { return this.context?.value ?? `${this.longTruncatorKind} ${this.displayValue}`; }
  /** Focus threshold display value. */
  public get displayValue() { return this.context?.displayValue ?? TruncatorService.focusThresholdDisplayValue; }
  /** Model getter. */
  public get model() {
    return this.context?.model ?? this.truncatorService?.FocusThreshold
      ?? TruncatorService.focusThresholdDefaults.get(TruncatorKind.Cv)
      ?? 20;
  }
  /** Focus threshold property name. */
  public get propertyName() { return this.context?.propertyName ?? TruncatorService.focusThresholdPropertyName; }

  /** Focus threshold clickable element. */
  @ViewChild('clickableFocusThreshold') clickableFocusThreshold!: ElementRef<HTMLSpanElement>;
  /** Focus threshold input element. */
  @ViewChild('inputFocusThreshold') inputFocusThreshold!: ElementRef<HTMLInputElement>;
  /** The tag cloud emphasis toggle element. */
  @ViewChild('tagCloudEmphasisToggle') tagCloudEmphasisToggle!: ToggleComponent;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Tag cloud emphasis context. */
  public get tagCloudEmphasisContext() {
    return {
      position: '',
      value: `${this.longTruncatorKind} ${ToggleComponent.displayValues.get(ToggleKind.TagCloudEmphasis)}`,
      displayValue: ToggleComponent.displayValues.get(ToggleKind.TagCloudEmphasis),
      model: this.truncatorService?.TagCloudEmphasis,
      subject: this.truncatorService,
      propertyName: 'TagCloudEmphasis',
      sliderClass: 'slider-blue'
    };
  }

  /**
   * Constructs the truncator component.
   * ~constructor
   *
   * @param truncatorServiceCv The CV truncator service injected dependency.
   * @param truncatorServicePs The Ps truncator service injected dependency.
   * @param truncatorServicePp The Pp truncator service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Cv)) private readonly truncatorServiceCv: TruncatorService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Ps)) private readonly truncatorServicePs: TruncatorService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Pp)) private readonly truncatorServicePp: TruncatorService,
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }

  /** Initialization */
  Initialize() {
    switch (this.truncatorKind) {
      case TruncatorKind.Cv: this.truncatorService = this.truncatorServiceCv; break;
      case TruncatorKind.Ps: this.truncatorService = this.truncatorServicePs; break;
      case TruncatorKind.Pp: this.truncatorService = this.truncatorServicePp; break;
    }
  }
}

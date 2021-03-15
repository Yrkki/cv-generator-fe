import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
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

  /** Truncator kind enum accessor. */
  public get TruncatorKind() { return TruncatorKind; }

  /** The proper truncator service to use. */
  public truncatorService!: TruncatorService;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Long truncator kind. */
  public get longTruncatorKind() {
    return this.truncatorKind === TruncatorKind.Cv ? this.portfolioService.entities['Curriculum Vitae']?.section
      : this.truncatorKind === TruncatorKind.Ps ? this.portfolioService.entities['Project Summary']?.section
        : this.truncatorKind === TruncatorKind.Pp ? this.portfolioService.entities['Project Portfolio']?.section
          : '';
  }

  /** Focus threshold value. */
  public get focusThresholdValue() { return `${this.longTruncatorKind} ${this.focusThresholdDisplayValue}`; }
  /** Focus threshold display value. */
  public get focusThresholdDisplayValue() { return 'focus threshold'; }
  /** Focus threshold property name. */
  public get focusThresholdPropertyName() { return 'FocusThreshold'; }
  /** Focus threshold context. */
  public get focusThresholdContext() {
    return {
      value: this.focusThresholdValue,
      displayValue: this.focusThresholdDisplayValue,
      model: this.truncatorService?.FocusThreshold,
      propertyName: this.focusThresholdPropertyName
    };
  }

  /** Tag cloud emphasis value. */
  public get tagCloudEmphasisValue() { return `${this.longTruncatorKind} ${this.tagCloudEmphasisDisplayValue}`; }
  /** Tag cloud emphasis display value. */
  public get tagCloudEmphasisDisplayValue() { return 'tag cloud emphasis'; }
  /** Tag cloud emphasis property name. */
  public get tagCloudEmphasisPropertyName() { return 'TagCloudEmphasis'; }
  /** Tag cloud emphasis context. */
  public get tagCloudEmphasisContext() {
    return {
      position: '',
      value: this.tagCloudEmphasisValue,
      displayValue: this.tagCloudEmphasisDisplayValue,
      model: this.truncatorService?.TagCloudEmphasis,
      propertyName: this.tagCloudEmphasisPropertyName,
      sliderClass: 'slider-blue'
    };
  }

  /** Toggle decorated clickable element. */
  @ViewChild('clickableToggleDecorated') clickableToggleDecorated?: ElementRef<HTMLSpanElement>;
  /** Toggle input element. */
  @ViewChild('toggleElement') toggleElement?: ElementRef<HTMLInputElement>;
  /** Slider clickable element. */
  @ViewChild('clickableSlider') clickableSlider?: ElementRef<HTMLSpanElement>;
  /** Toggle clickable element. */
  @ViewChild('clickableToggle') clickableToggle?: ElementRef<HTMLSpanElement>;

  /** Focus threshold clickable element. */
  @ViewChild('clickableFocusThreshold') clickableFocusThreshold?: ElementRef<HTMLSpanElement>;
  /** Focus threshold input element. */
  @ViewChild('focusThresholdElement') focusThresholdElement?: ElementRef<HTMLInputElement>;

  /**
   * Constructs the truncator component.
   * ~constructor
   *
   * @param truncatorServiceCv The CV truncator service injected dependency.
   * @param truncatorServicePs The Ps truncator service injected dependency.
   * @param truncatorServicePp The Pp truncator service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Cv)) private readonly truncatorServiceCv: TruncatorService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Ps)) private readonly truncatorServicePs: TruncatorService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Pp)) private readonly truncatorServicePp: TruncatorService,
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
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

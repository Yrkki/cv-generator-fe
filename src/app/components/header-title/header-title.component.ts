import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { SorterComponent } from '../sorter/sorter.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { SorterKind } from '../../enums/sorter-kind.enum';

/**
 * Header title component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements AfterViewInit {
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Entity shortcut. */
  public get entity() { return this.entities[this.key]; }

  /** The component key */
  @Input() public key = 'key';

  /** Next sort synced index entity panel element. */
  @Input() public nextSortElement?: HTMLElement;

  /** Sorter kind */
  public get sorterKind(): SorterKind {
    // return this.entity.parent === this.entities.Accomplishments.key ? SorterKind.Accomplishments
    //   : this.entity.key === this.entities.Publications.key ? SorterKind.Publications
    //     : this.entities[this.entity.parent]?.parent === this.entities['Project Summary'].key ? SorterKind.Spectrum
    //       : this.entity.parent === this.entities.Projects.key ? SorterKind.Projects
    //         : -1 as SorterKind;

    const map = new Map([
      ['Certifications', SorterKind.Accomplishments],
      ['Languages', SorterKind.Accomplishments],
      ['Courses', SorterKind.Accomplishments],
      ['Organizations', SorterKind.Accomplishments],
      ['Volunteering', SorterKind.Accomplishments],
      ['Vacation', SorterKind.Accomplishments],

      ['Publications', SorterKind.Publications],

      ['Client', SorterKind.Spectrum],
      ['Country', SorterKind.Spectrum],
      ['Industry', SorterKind.Spectrum],
      ['Project type', SorterKind.Spectrum],
      ['System type', SorterKind.Spectrum],

      ['Platform', SorterKind.Spectrum],
      ['Architecture', SorterKind.Spectrum],
      ['Languages and notations', SorterKind.Spectrum],
      ['IDEs and Tools', SorterKind.Spectrum],
      ['Methodology and practices', SorterKind.Spectrum],

      ['Role', SorterKind.Spectrum],
      ['Responsibilities', SorterKind.Spectrum],
      ['Team size', SorterKind.Spectrum],
      ['Position', SorterKind.Spectrum],
      ['Reference', SorterKind.Spectrum],

      ['Contributions', SorterKind.Projects],
      ['List', SorterKind.Projects],
      ['Index', SorterKind.Projects],
      ['Projects', SorterKind.Projects],
    ]);

    // const key = this.key.replace(new RegExp(['Index', 'List', 'Chart', 'Map'].map((_) => ' ' + _).join('|'), 'g'), '');
    const key = this.key;
    return map.get(key) ?? -1 as SorterKind;
  }

  /** Count section counter */
  public get count() { return this.entitiesService.getCountValue(this.key); }

  /** Clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLAnchorElement>;

  /** Sorter component element. */
  @ViewChild('sorter') sorter?: SorterComponent;

  /**
   * Constructs the Header title component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private entitiesService: EntitiesService,
    private inputService: InputService,
    public uiService: UiService,
  ) {
  }

  /** Initialization */
  ngAfterViewInit(): void {
    const nextSortElement = this.nextSortElement;
    if (!nextSortElement) { return; }

    nextSortElement.onclick = (event: MouseEvent) => { this.nextSort(event); nextSortElement.title = this.title; };
    nextSortElement.onkeypress = this.keypress;
    nextSortElement.onmouseenter = () => { nextSortElement.title = this.title; };
    nextSortElement.setAttribute('attr.aria-labelledby', this.uiService.label(nextSortElement.id));
  }

  /** Title getter. */
  private get title() {
    const nextSortElement = this.nextSortElement;
    if (!nextSortElement) { return ''; }

    const title = this.nextSortTitle();
    nextSortElement.style.cursor = !!title ? 'pointer' : 'default';

    return title;
  }

  /** Next sort delegate. */
  private nextSort(event: MouseEvent, back = false) {
    this.sorter?.nextSort(event, back);
  }

  /** Next sort title delegate. */
  private nextSortTitle(back = false) {
    return this.sorter?.nextSortTitle(back) ?? '';
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

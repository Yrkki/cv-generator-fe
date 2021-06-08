import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { SorterComponent } from '../sorter/sorter.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { Go } from '../../enums/go.enum';

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
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** Entity shortcut. */
  public get entity() { return this.entities[this.key]; }

  /** The component key */
  @Input() public key = 'HeaderTitle';

  /** Next sort synced index entity panel element. */
  @Input() public nextSortElement?: HTMLElement;

  /** Sorter kind */
  public get sorterKind(): SorterKind {
    // return this.entity.parent === this.entities.Accomplishments.key ? SorterKind.Accomplishments
    //   : this.entity.key === this.entities.Publications.key ? SorterKind.Publications
    //     : this.entities[this.entity.parent]?.parent === this.entities['Project Summary'].key ? SorterKind.Spectrum
    //       : this.entity.parent === this.entities.Projects.key ? SorterKind.Projects
    //         : -1 as SorterKind;

    const map = new Map();
    ['Certifications', 'Languages', 'Courses', 'Organizations', 'Volunteering', 'Vacation']
      .forEach((_) => { map.set(_, SorterKind.Accomplishments); });
    ['Publications']
      .forEach((_) => { map.set(_, SorterKind.Publications); });

    ['Client', 'Country', 'Industry', 'Project type', 'System type',
      'Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools', 'Methodology and practices',
      'Role', 'Responsibilities', 'Team size', 'Position', 'Reference']
      .forEach((_) => { map.set(_, SorterKind.Spectrum); });

    ['Contributions', 'List', 'Index', 'Projects']
      .forEach((_) => { map.set(_, SorterKind.Projects); });

    // const key = this.key.replace(new RegExp(['Index', 'List', 'Chart', 'Map'].map((_) => ' ' + _).join('|'), 'g'), '');
    const key = this.key;
    return map.get(key) ?? -1 as SorterKind;
  }

  /** Formatted section counter */
  public get count() { return this.entitiesService.getCountValueFormatted(this.key); }

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
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    const nextSortElement = this.nextSortElement;
    if (!nextSortElement) { return; }

    nextSortElement.onclick = (event: MouseEvent) => { this.nextSort(event); };
    nextSortElement.onkeypress = this.keypress;
    nextSortElement.onmouseenter = () => { nextSortElement.title = this.title; };
    nextSortElement.setAttribute('attr.aria-labelledby', this.uiService.label(nextSortElement.id));
  }

  /** Enabled. */
  private get enabled() {
    return this.key !== 'Country' && this.portfolioService.toolbarService.tagCloudIsTagCloud;
  }

  /** Title getter. */
  private get title() {
    const nextSortElement = this.nextSortElement;
    if (!nextSortElement) { return ''; }

    const title = this.enabled ? this.nextSortTitle() : '';
    nextSortElement.style.cursor = title ? 'pointer' : 'default';

    return title;
  }

  /** Next sort. */
  private nextSort(event: MouseEvent, go = Go.Forward) {
    if (this.enabled) {
      this.sorter?.subSortField.nextSort(event, go);
      if (this.nextSortElement) { this.nextSortElement.title = this.title; }
    }
  }

  /** Next sort title delegate. */
  private nextSortTitle(go = Go.Forward) {
    return this.sorter?.subSortField.nextSortTitle(go) ?? '';
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}

import {
  Component, Injector, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, Inject
} from '@angular/core';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseComponent } from '../course/course.component';
import { LanguageComponent } from '../language/language.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from '../../interfaces/indexable';
import { HeaderComponent } from '../header/header.component';

/**
 * Accomplishments component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent implements AfterViewInit {
  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioService.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** SorterKind enum accessor. */
  public get SorterKind() { return SorterKind; }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Course index component ComponentOutlet hook. */
  public get CourseIndexComponent() { return CourseIndexComponent; }
  /** Course list component ComponentOutlet hook. */
  public get CourseListComponent() { return CourseListComponent; }
  /** Course component ComponentOutlet hook. */
  public get CourseComponent() { return CourseComponent; }
  /** Language component ComponentOutlet hook. */
  public get LanguageComponent() { return LanguageComponent; }

  /** The state of the dependencies determining whether should collapse the projects accomplishments section delegate. */
  private get projectsAccomplishmentShouldCollapseState() { return this.accomplishmentsService.projectsAccomplishmentShouldCollapseState; }

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Accomplishments component.
   * ~constructor
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    @Inject(SorterService.tokenDescription(SorterKind.Accomplishments)) public readonly sorterService: SorterService,
    @Inject(TruncatorService.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    private readonly inputService: InputService,
    public readonly uiService: UiService,
    private readonly persistenceService: PersistenceService,
    private readonly injector: Injector,
    private readonly componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    // initialize whether should collapse the projects accomplishments section
    this.updateShouldCollapseProjectsAccomplishment('Accomplishments');

    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Accomplishments',
      'Certifications',
      'Certifications Index',
      'Certifications List',
      'Languages',
      'Languages Index',
      'Languages List',
      'Languages Chart',
      'Courses',
      'Courses Index',
      'Courses List',
      'Organizations',
      'Organizations Index',
      'Organizations List',
      'Volunteering',
      'Volunteering Index',
      'Volunteering List',
      'Vacation',
      'Vacation Index',
      'Vacation List'
    ].forEach((_) => this.restoreToggle(document, _));
    // for (const entityKey in this.entities) {
    //   if (Object.prototype.hasOwnProperty.call(this.entities, entityKey)) {
    //     this.restoreToggle(document, entityKey);
    //   }
    // }
  }

  /**
   * Update whether should collapse the projects accomplishments section mouse event handler.
   * @param event The click event initiating the save.
   */
  public updateShouldCollapseProjectsAccomplishmentHandler(event: MouseEvent) {
    const targetElement = event.currentTarget as HTMLElement;
    if (!targetElement) { return; }
    const ownerElement = targetElement.attributes.getNamedItem('id')?.ownerElement as HTMLElement;
    const typeName = ownerElement.id;
    this.updateShouldCollapseProjectsAccomplishment(typeName);
  }

  /**
   * Update whether should collapse the projects accomplishments section.
   * @param typeName The projects owner section id.
   */
  public updateShouldCollapseProjectsAccomplishment(typeName: string) {
    this.projectsAccomplishmentShouldCollapseState[typeName] =
      this.persistenceService.getToggle(typeName)?.['content-class'] === 'collapse';
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.persistenceService.restoreToggle(document, typeName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /**
   *  Whether projects are defined.
   * ~delegate
   *
   * @returns Whether the projects are defined.
   */
  projectsDefined(): boolean {
    return this.portfolioService.projectsDefined();
  }
}

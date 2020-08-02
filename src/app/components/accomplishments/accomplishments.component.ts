import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseComponent } from '../course/course.component';
import { LanguageComponent } from '../language/language.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from '../../interfaces/indexable';

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
  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** Accomplishments clickable element. */
  @ViewChild('clickableAccomplishments') clickableAccomplishments?: ElementRef;

  /** Certifications clickable element. */
  @ViewChild('clickableCertifications') clickableCertifications?: ElementRef;

  /** Languages clickable element. */
  @ViewChild('clickableLanguages') clickableLanguages?: ElementRef;

  /** Courses clickable element. */
  @ViewChild('clickableCourses') clickableCourses?: ElementRef;

  /** Course index clickable element. */
  @ViewChild('clickableCourseIndex') clickableCourseIndex?: ElementRef;

  /** Course clickable element. */
  @ViewChild('clickableCourse') clickableCourse?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioService.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioService.countCache; }

  /** Filtered accomplishments delegate. */
  public get filteredAccomplishments() { return this.portfolioService.filteredAccomplishments; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** Course index component ComponentOutlet hook. */
  public CourseIndexComponent = CourseIndexComponent;
  /** Course component ComponentOutlet hook. */
  public CourseComponent = CourseComponent;
  /** Language component ComponentOutlet hook. */
  public LanguageComponent = LanguageComponent;

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
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    private accomplishmentsService: AccomplishmentsService,
    private portfolioService: PortfolioService,
    protected entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    private persistenceService: PersistenceService,
    private injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
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
      'Languages',
      'Courses',
      'Courses Index',
      'Courses List'
    ].forEach(_ => this.persistenceService.restoreToggle(document, _));
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

  /**
   * Filtered projects getter.
   * ~delegate
   *
   * @returns The projects filtered.
   */
  public get filteredProjects() { return this.portfolioService.filteredProjects; }
}

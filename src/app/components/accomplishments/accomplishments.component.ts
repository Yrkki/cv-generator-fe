import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseComponent } from '../course/course.component';
import { LanguageComponent } from '../language/language.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from 'src/app/interfaces/indexable';

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
  public get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioComponent.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Filtered accomplishments delegate. */
  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** Course index component ComponentOutlet hook. */
  public CourseIndexComponent = CourseIndexComponent;
  /** Course component ComponentOutlet hook. */
  public CourseComponent = CourseComponent;
  /** Language component ComponentOutlet hook. */
  public LanguageComponent = LanguageComponent;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Accomplishments component.
   * ~constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    public injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
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
    ].forEach(_ => this.restoreToggle(document, _));
  }

  /** Count delegate. */
  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.portfolioComponent.restoreToggle(document, typeName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
  }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }

  /**
   *  Whether projects are defined.
   * ~delegate
   *
   * @returns Whether the projects are defined.
   */
  projectsDefined(): boolean {
    return this.portfolioComponent.projectsDefined();
  }

  /**
   * Filtered projects getter.
   * ~delegate
   *
   * @returns The projects filtered.
   */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }
}

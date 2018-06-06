import { Component, Injector, AfterViewInit, Input, TemplateRef } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseComponent } from '../course/course.component';
import { EducationComponent } from '../education/education.component';
import { LanguageComponent } from '../language/language.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from '../professional-experience/professional-experience.component';
import { PublicationIndexComponent } from '../publication-index/publication-index.component';
import { PublicationComponent } from '../publication/publication.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

/**
 * CV component
 */
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements AfterViewInit {
  /** Header link template reference. */
  @Input() headerLink: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter: TemplateRef<any>;


  /** Frequencies divider object delegate. */
  private get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioComponent.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Filtered accomplishments delegate. */
  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }
  /** Filtered publications delegate. */
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** Course index component ComponentOutlet hook. */
  private CourseIndexComponent = CourseIndexComponent;
  /** Course component ComponentOutlet hook. */
  private CourseComponent = CourseComponent;
  /** Education component ComponentOutlet hook. */
  private EducationComponent = EducationComponent;
  /** Language component ComponentOutlet hook. */
  private LanguageComponent = LanguageComponent;
  /** Personal data component ComponentOutlet hook. */
  private PersonalDataComponent = PersonalDataComponent;
  /** Professional experience component ComponentOutlet hook. */
  private ProfessionalExperienceComponent = ProfessionalExperienceComponent;
  /** Publication index component ComponentOutlet hook. */
  private PublicationIndexComponent = PublicationIndexComponent;
  /** Publication component ComponentOutlet hook. */
  private PublicationComponent = PublicationComponent;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName, i?): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs a Spectrum component.
   * @constructor
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

  /** Initialization */
  ngAfterViewInit() {
    ['Curriculum Vitae'].forEach(_ => this.restoreToggle(document, _));
    ['Personal Data',
      'Background',
      'Project Portfolio',
      'Professional Experience',
      'Education',
      'Accomplishments',
      'Certifications',
      'Languages',
      'Courses',
      'Courses Index',
      'Courses List',
      'Publications',
      'Publications Index',
      'Publications List',
      'Publications'].forEach(_ => this.restoreToggle(document, _));
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
  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }
}

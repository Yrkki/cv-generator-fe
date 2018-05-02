import { Component, OnInit, Input, Injector, ReflectiveInjector, AfterViewInit } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseComponent } from '../course/course.component';
import { EducationComponent } from '../education/education.component';
import { LanguageComponent } from '../language/language.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from '../professional-experience/professional-experience.component';
import { PublicationComponent } from '../publication/publication.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit, AfterViewInit {
  private readonly frequenciesDivider;

  public get cv() { return this.portfolioComponent.cv; }
  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }

  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  private CourseIndexComponent = CourseIndexComponent;
  private CourseComponent = CourseComponent;
  private EducationComponent = EducationComponent;
  private LanguageComponent = LanguageComponent;
  private PersonalDataComponent = PersonalDataComponent;
  private ProfessionalExperienceComponent = ProfessionalExperienceComponent;
  private PublicationComponent = PublicationComponent;

  private injectorCache = {};
  getInjector(propertyName, i?): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  constructor(
    public portfolioComponent: PortfolioComponent,
    public injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.restoreToggle(document, 'Curriculum Vitae', 'CurriculumVitaeContent');
    this.restoreToggle(document, 'Personal Data', 'PersonalDataContent');
    this.restoreToggle(document, 'Background', 'BackgroundContent');
    this.restoreToggle(document, 'Professional Experience', 'ProfessionalExperienceContent');
    this.restoreToggle(document, 'Education', 'EducationContent');
    this.restoreToggle(document, 'Accomplishments', 'AccomplishmentsContent');
    this.restoreToggle(document, 'Certifications', 'CertificationsContent');
    this.restoreToggle(document, 'Languages', 'LanguagesContent');
    this.restoreToggle(document, 'Courses', 'CoursesContent');
    this.restoreToggle(document, 'Courses Index', 'CoursesIndexContent');
    this.restoreToggle(document, 'Courses List', 'CoursesListContent');
    this.restoreToggle(document, 'Publications', 'PublicationsContent');
  }

  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }
}

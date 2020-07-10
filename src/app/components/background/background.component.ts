import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { EducationComponent } from '../education/education.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from '../professional-experience/professional-experience.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

/**
 * Background component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit {
  /** Header link template reference. */
  @Input() headerLink: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter: TemplateRef<any>;

  /** Personal data clickable element. */
  @ViewChild('clickablePersonalData') clickablePersonalData: ElementRef;

  /** Background clickable element. */
  @ViewChild('clickableBackground') clickableBackground: ElementRef;

  /** Experience clickable element. */
  @ViewChild('clickableExperience') clickableExperience: ElementRef;

  /** Education clickable element. */
  @ViewChild('clickableEducation') clickableEducation: ElementRef;

  /** Frequencies divider object delegate. */
  private get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioComponent.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioComponent.countCache; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** Education component ComponentOutlet hook. */
  private EducationComponent = EducationComponent;
  /** Personal data component ComponentOutlet hook. */
  private PersonalDataComponent = PersonalDataComponent;
  /** Professional experience component ComponentOutlet hook. */
  private ProfessionalExperienceComponent = ProfessionalExperienceComponent;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName, i?): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Background component.
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
    ['Personal Data',
      'Background',
      'Project Portfolio',
      'Professional Experience',
      'Education'].forEach(_ => this.restoreToggle(document, _));
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

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
 }

  /** TrackBy iterator help function. */
  trackByFn(index, item) {
    return index;
  }
}

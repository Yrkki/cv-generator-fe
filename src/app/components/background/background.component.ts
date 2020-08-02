import { Component, Injector, AfterViewInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { EducationComponent } from '../education/education.component';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { ProfessionalExperienceComponent } from '../professional-experience/professional-experience.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from '../../interfaces/indexable';

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
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

  /** Personal data clickable element. */
  @ViewChild('clickablePersonalData') clickablePersonalData?: ElementRef;

  /** Background clickable element. */
  @ViewChild('clickableBackground') clickableBackground?: ElementRef;

  /** Experience clickable element. */
  @ViewChild('clickableExperience') clickableExperience?: ElementRef;

  /** Education clickable element. */
  @ViewChild('clickableEducation') clickableEducation?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** CV delegate. */
  public get cv() { return this.portfolioService.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Count cache delegate. */
  public get countCache() { return this.portfolioService.countCache; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** Education component ComponentOutlet hook. */
  public EducationComponent = EducationComponent;
  /** Personal data component ComponentOutlet hook. */
  public PersonalDataComponent = PersonalDataComponent;
  /** Professional experience component ComponentOutlet hook. */
  public ProfessionalExperienceComponent = ProfessionalExperienceComponent;

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

  /**
   * Constructs the Background component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    private portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    private persistenceService: PersistenceService,
    private injector: Injector,
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
      'Education'].forEach(_ => this.persistenceService.restoreToggle(document, _));
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
}

import { Injectable, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';

import { Entities } from '../../classes/entities/entities';
import { Entity } from '../../interfaces/entities/entity';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { PersistenceService } from '../persistence/persistence.service';
import { CountCacheService } from '../count-cache/count-cache.service';

import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';
import { Course } from '../../interfaces/cv/course';
import { Publication } from '../../interfaces/cv/publication';
import { Project } from '../../interfaces/project/project';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

/**
 * A portfolio service.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  /** Data getter. */
  public get data() {
    return {
      'cv': this.portfolioModel.cv,
      'entities': this.portfolioModel.entities,
      'projects': this.portfolioModel.projects,
      'ui': this.portfolioModel.ui
    };
  }

  /** CV getter. */
  public get cv() { return this.portfolioModel.cv; }
  /** CV setter. */
  public set cv(value) { this.portfolioModel.cv = value; }

  /** Entities getter. */
  public get entities() { return this.portfolioModel.entities; }
  /** Entities setter. */
  public set entities(value) { this.portfolioModel.entities = value; }

  /** Projects getter. */
  public get projects() { return this.portfolioModel.projects; }
  /** Projects setter. */
  public set projects(value) { this.portfolioModel.projects = value; }

  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }
  /** UI data setter. */
  public set ui(value) { this.portfolioModel.ui = value; }

  /** Aggregation count cache. */
  /** Aggregation count cache getter. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /** Filtered model getter. */
  public get filtered() {
    return {
      'Professional Experience': this.portfolioModel.filteredProfessionalExperience,
      'Education': this.portfolioModel.filteredEducation,
      'Accomplishments': this.portfolioModel.filteredAccomplishments,
      'Publications': this.portfolioModel.filteredPublications,
      'Projects': this.portfolioModel.filteredProjects
    };
  }

  /** Filtered professional experience for the current search context. */
  /** Filtered professional getter. */
  public get filteredProfessionalExperience() { return this.portfolioModel.filteredProfessionalExperience; }
  /** Filtered professional setter. */
  public set filteredProfessionalExperience(value) { this.portfolioModel.filteredProfessionalExperience = value; }
  /** Filtered education for the current search context. */
  /** Filtered education getter. */
  public get filteredEducation() { return this.portfolioModel.filteredEducation; }
  /** Filtered education setter. */
  public set filteredEducation(value) { this.portfolioModel.filteredEducation = value; }

  /** Filtered accomplishments for the current search context. */
  /** Filtered accomplishments getter. */
  public get filteredAccomplishments() { return this.portfolioModel.filteredAccomplishments; }
  /** Filtered accomplishments setter. */
  public set filteredAccomplishments(value) {
    this.portfolioModel.filteredAccomplishments = value;
    this.portfolioModel.filteredCertifications = value.filter(_ => this.isCertification(_));
    this.portfolioModel.filteredCourses = value.filter(_ => this.isCourse(_));
    this.portfolioModel.filteredOrganizations = value.filter(_ => this.isOrganization(_));
  }

  /** Filtered certifications for the current search context. */
  /** Filtered certifications getter. */
  public get filteredCertifications() { return this.portfolioModel.filteredCertifications; }

  /** Filtered courses for the current search context. */
  /** Filtered courses getter. */
  public get filteredCourses() { return this.portfolioModel.filteredCourses; }

  /** Filtered organizations for the current search context. */
  /** Filtered organizations getter. */
  public get filteredOrganizations() { return this.portfolioModel.filteredOrganizations; }

  /** Filtered publications for the current search context. */
  /** Filtered publications getter. */
  public get filteredPublications() { return this.portfolioModel.filteredPublications; }
  /** Filtered publications setter. */
  public set filteredPublications(value) { this.portfolioModel.filteredPublications = value; }

  /** Filtered projects for the current search context. */
  /** Filtered projects getter. */
  public get filteredProjects() { return this.portfolioModel.filteredProjects; }
  /** Filtered projects setter. */
  public set filteredProjects(value) { this.portfolioModel.filteredProjects = value; }

  /** Search query string expression getter. */
  public get SearchToken(): string {
    return this.portfolioModel.searchToken;
  }
  /** Search query string expression setter. */
  public set SearchToken(value: string) {
    this.portfolioModel.searchToken = value;
    this.filteredProjects = this.calcFilteredProjects();
    this.filteredAccomplishments = this.calcFilteredAccomplishments();
    this.filteredPublications = this.calcFilteredPublications();
    this.filteredProfessionalExperience = this.calcFilteredProfessionalExperience();
    this.filteredEducation = this.calcFilteredEducation();
    this.calcCountCache();
    this.searchTokenChanged$.emit(this.portfolioModel.searchToken);
  }

  /** Search query string expression changed event. */
  public readonly searchTokenChanged$ = new EventEmitter<string>();

  /** Tag cloud getter. */
  public get tagCloud(): TagCloudDisplayMode {
    return Number.parseInt(this.persistenceService.getItem('tagCloud') ?? '1', 10) || TagCloudDisplayMode.tagCloud;
  }
  /** Tag cloud setter. */
  public set tagCloud(value: TagCloudDisplayMode) {
    this.persistenceService.setItem('tagCloud', value.toString());

    this.chartService.refreshCharts();
    this.searchTokenChanged$.emit(this.SearchToken);
  }

  /** Decorations getter. */
  public get decorations() {
    return this.persistenceService.getItem('decorations') === 'true';
  }
  /** Decorations setter. */
  public set decorations(value) {
    this.persistenceService.setItem('decorations', value.toString());
  }

  /** Pagination getter. */
  public get pagination() {
    return this.persistenceService.getItem('pagination') === 'true';
  }
  /** Pagination setter. */
  public set pagination(value) {
    this.persistenceService.setItem('pagination', value.toString());
  }

  /** Project period decrypted getter. */
  public get decryptedPeriod() { return this.countCacheService.decryptedPeriod; }

  /** Frequencies cache. */
  /** Frequencies cache getter. */
  public get frequenciesCache() { return this.entitiesModel.frequenciesCache; }
  /** Frequencies cache setter. */
  public set frequenciesCache(value) { this.entitiesModel.frequenciesCache = value; }

  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    private persistenceService: PersistenceService,
    private dataService: DataService,
    private chartService: ChartService,
    private searchEngineService: SearchEngineService,
    private countCacheService: CountCacheService,
    private portfolioModel: PortfolioModel,
    private entitiesModel: EntitiesModel
  ) {
  }

  /**
   * Load data
   */
  LoadData() {
    setTimeout(() => {
      this.getUi();
      this.getEntities();

      this.getCv();
      this.getProfessionalExperience();
      this.getEducation();
      this.getAccomplishments();
      this.getPublications();

      this.getProjects();

      this.chartService.initColors();
    });
  }

  /** Loads the CV. */
  private getCv(): void {
    this.dataService.getCv().pipe(take(1)).subscribe((cv) => {
      if (this.isEmpty(cv)) { return; }
      this.cv = cv;

      // prefilter accessible personal data
      this.cv['Personal data'] = this.cv['Personal data'].filter(_ => _['Personal data'] && !['true', 'TRUE'].includes(_.Hidden));

      this.calcCountCache();
    });
  }

  /** Loads the professional experience. */
  private getProfessionalExperience(): void {
    this.dataService.getProfessionalExperience().pipe(take(1)).subscribe((experience) => {
      if (this.isEmpty(experience)) { return; }
      // this.experience = experience;
      this.cv['Professional experience'] = experience;
      this.filteredProfessionalExperience = experience;
      // this.calcCountCache();
    });
  }

  /** Loads the education. */
  private getEducation(): void {
    this.dataService.getEducation().pipe(take(1)).subscribe((education) => {
      if (this.isEmpty(education)) { return; }
      // this.education = education;
      this.cv.Education = education;
      this.filteredEducation = education;
      // this.calcCountCache();
    });
  }

  /** Loads the accomplishments. */
  private getAccomplishments(): void {
    this.dataService.getAccomplishments().pipe(take(1)).subscribe((accomplishments) => {
      if (this.isEmpty(accomplishments)) { return; }
      // this.accomplishments = accomplishments;
      this.cv.Courses = accomplishments;
      this.filteredAccomplishments = accomplishments;
      // this.calcCountCache();
    });
  }

  /** Loads the publications. */
  private getPublications(): void {
    this.dataService.getPublications().pipe(take(1)).subscribe((publications) => {
      if (this.isEmpty(publications)) { return; }
      // this.publications = publications;
      this.cv.Publications = publications;
      this.filteredPublications = publications;
      // this.calcCountCache();
    });
  }

  /** Loads the projects. */
  private getProjects(): void {
    this.dataService.getProjects().pipe(take(1)).subscribe((projects) => {
      if (this.isEmpty(projects)) { return; }
      this.projects = projects;
      this.filteredProjects = projects;
      this.calcCountCache();
    });
  }

  /** Loads the entities. */
  private getEntities(): void {
    this.dataService.getEntities().pipe(take(1)).subscribe((entities) => {
      if (this.isEmpty(entities)) { return; }
      this.adjustEntities(entities);
      this.entities = entities;
    });
  }

  /** Loads the UI. */
  private getUi(): void {
    this.dataService.getUi().pipe(take(1)).subscribe((ui) => {
      if (this.isEmpty(ui)) { return; }
      this.ui = ui;
    });
  }

  /**
   * One person team project indicator.
   * @param project The project index
   */
  public getProjectIsOnePersonTeam(project: Project): boolean {
    const teamSize = 'Team size';
    return project[teamSize] === 1;
  }

  /**
   * Project starts new period indicator.
   * @param project The project index
   */
  public getProjectStartsNewPeriod(project: Project): boolean {
    const newPeriod = 'New Period';
    return project[newPeriod] !== '';
  }

  /**
   * Project period decrypted delegate
   * ~delegate
   *
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string { return this.countCacheService.getDecryptedProjectPeriod(project); }

  /**
   * Adjusts the entities.
   * @param entities The entities.
   */
  private adjustEntities(entities: Entities) {
    for (const key in entities) {
      if (entities.hasOwnProperty(key)) {
        const entity = entities[key] as Entity;

        // calculate key
        entity.key = key;

        // start calculating section
        entity.section = entity.node;
        entity.section = this.toTitleCase(entity.section);

        // adjust some words' case
        if (['IDEs and Tools'].includes(key)) {
          entity.section = entity.node;
        }

        // prefix some with 'By'
        // ...

        // pluralise others
        if (['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
          'Role', 'Responsibilities', 'Team size', 'Position', 'Reference'].includes(key)) {
          if (entity.section.substr(entity.section.length - 1) !== 's') {
            entity.section += 's';
          }
        }

        // specially pluralise others
        // ...

        // completely change others
        if (['General Timeline Map'].includes(key)) {
          entity.section = '';
        }

        // apply AI to some
        entity.AI = ['Responsibilities'].includes(key);

        // fix encrypted periods when needed
        if (['Contemporary Period', 'Modern Age', 'Renaissance', 'Dark Ages'].includes(key)) {
          this.decryptedPeriod[entity.node] = key;
          entity.node = key;
        }

        // calculate chart name
        entity.chart = this.chartService.chartName(key);

        // calculate content name
        entity.content = this.contentName(key);
      }
    }
  }

  /**
   * Names a content element.
   * @param key The type of content.
   *
   * @returns The content element name.
   */
  private contentName(key: string): string {
    return this.replaceAll(key + ' content', ' ', '_');
  }

  /**
   * Whether UI is defined.
   *
   * @returns Whether the UI is defined.
   */
  uiDefined(): boolean {
    return this.jsonDefined(this.ui);
  }

  /**
   *  Whether entities are defined.
   *
   * @returns Whether the entities are defined.
   */
  entitiesDefined(): boolean {
    return this.jsonDefined(this.entities);
  }

  /**
   *  Whether CV is defined.
   *
   * @returns Whether the CV is defined.
   */
  cvDefined(): boolean {
    return this.jsonDefined(this.cv);
  }

  /**
   *  Whether projects are defined.
   *
   * @returns Whether the projects are defined.
   */
  projectsDefined(): boolean {
    return this.jsonDefined(this.projects);
  }

  /**
   *  Whether the general timeline is defined.
   *
   * @returns Whether the general timeline is defined.
   */
  generalTimelineDefined(): boolean {
    return true;
  }

  /**
   * Whether a specific json is defined.
   * @param json The json to check.
   *
   * @returns Whether the json is defined.
   */
  public jsonDefined(json: any): boolean {
    return typeof json !== 'undefined' && this.isInitialized(json);
  }

  /**
   * Whether an object is empty.
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Whether an object is initialized.
   * @param obj The object to check.
   *
   * @returns Whether an object is initialized.
   */
  private isInitialized(obj: object): boolean {
    // return Object.values(obj).some(value => value.length > 0);
    // return !this.isEmpty(obj) && obj !== {} && obj !== [];
    return JSON.stringify(obj).length > 50;
  }

  /** Calculates the count cache for the property types registered and refreshes the clients. */
  private calcCountCache() {
    this.countCacheService.calcCountCache();
    this.chartService.refreshCharts();
  }

  /**
   * Gets the calculated frequencies object for an entity.
   * @param project The entity.
   *
   * @returns The calculated frequencies object for an entity.
   */
  public getFrequenciesCache(propertyName: string): any[] {
    return this.frequenciesCache[propertyName];
  }

  /**
   * Checkes if the section toggle state is collapsed.
   * ~delegate
   *
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public checkToggleCollapsed(propertyName: string): boolean { return this.countCacheService.checkToggleCollapsed(propertyName); }

  /**
   * Whether accomplishment is of type certification.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type certification.
   */
  public isCertification(accomplishment: Course): boolean {
    return ['Certification'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type course.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type course.
   */
  public isCourse(accomplishment: Course): boolean {
    return !this.isCertification(accomplishment) && !this.isOrganization(accomplishment);
  }

  /**
   * Whether accomplishment is of type organization.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type organization.
   */
  public isOrganization(accomplishment: Course): boolean {
    return ['Conference', 'Eventbrite', 'Meetup'].includes(accomplishment.Type);
  }

  /**
   * Calculates the filtered projects for the current search context.
   *
   * @returns The filtered projects for the current search context.
   */
  private calcFilteredProjects(): Project[] {
    if (typeof this.projects === 'undefined') { return []; }

    const retVal = this.calcFiltered<Project>(this.projects);

    return retVal;
  }

  /**
   * Calculates the filtered accomplishments for the current search context.
   *
   * @returns The filtered accomplishments for the current search context.
   */
  private calcFilteredAccomplishments(): Course[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv.Courses === 'undefined') { return []; }

    const retVal = this.calcFiltered<Course>(this.cv.Courses);

    return retVal;
  }

  /**
   * Calculates the filtered publications for the current search context.
   *
   * @returns The filtered publications for the current search context.
   */
  private calcFilteredPublications(): Publication[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv.Publications === 'undefined') { return []; }

    const retVal = this.calcFiltered<Publication>(this.cv.Publications);

    return retVal;
  }

  /**
   * Calculates the filtered professional experiences for the current search context.
   *
   * @returns The filtered professional experiences for the current search context.
   */
  private calcFilteredProfessionalExperience(): ProfessionalExperience[] {
    const retVal = this.calcFiltered<ProfessionalExperience>(this.cv['Professional experience']);

    // console.log('Debug: calcFilteredProfessionalExperience', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered education entries for the current search context.
   *
   * @returns The filtered education entries for the current search context.
   */
  private calcFilteredEducation(): Education[] {
    const retVal = this.calcFiltered<Education>(this.cv.Education);

    // console.log('Debug: calcFilteredEducation', retVal);
    return retVal;
  }

  /**
   * Performs the search.
   * @param array The assay to filter.
   *
   * @returns Filtered array according to the current search context.
   */
  private calcFiltered<T>(array: Array<T>): Array<T> {
    return this.searchEngineService.search<T>(array, this.SearchToken);
  }

  /**
   * Updates the search with a new search query initiating a new search.
   * @param newValue The new search query.
   */
  public updateSearchToken(newValue: string) {
    // newValue = '\"' + newValue.replace('\"', '\\\"') + '\"';
    this.SearchToken = newValue;
  }

  /** Replace all delegate. */
  public replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
  /** To title case delegate. */
  private toTitleCase(str: string) { return StringExService.toTitleCase(str); }
}

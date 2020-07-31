import { Injectable, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { Entities } from '../../classes/entities/entities';
import { Entity } from '../../interfaces/entities/entity';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { PersistenceService } from '../persistence/persistence.service';

import { Indexable } from '../..//interfaces/indexable';
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
  public get countCache() { return this.portfolioModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.portfolioModel.countCache = value; }

  /** Filtered model getter. */
  public get filtered() {
    return {
      'Professional Experience': this.portfolioModel.filteredProfessionalExperience,
      'Education': this.portfolioModel.filteredEducation,
      'Certifications': this.portfolioModel.filteredCertifications,
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

  /** Filtered certifications for the current search context. */
  /** Filtered certifications getter. */
  public get filteredCertifications() { return this.portfolioModel.filteredCertifications; }
  /** Filtered certifications setter. */
  public set filteredCertifications(value) { this.portfolioModel.filteredCertifications = value; }
  /** Filtered accomplishments for the current search context. */
  /** Filtered accomplishments getter. */
  public get filteredAccomplishments() { return this.portfolioModel.filteredAccomplishments; }
  /** Filtered accomplishments setter. */
  public set filteredAccomplishments(value) { this.portfolioModel.filteredAccomplishments = value; }
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
    this.filteredCertifications = this.calcFilteredCertifications();
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

  /** Project period decrypted. */
  private readonly decryptedPeriod: Indexable = {};

  /** Frequencies cache. */
  private frequenciesCache: Indexable = {};

  /**
   * Constructs the Portfolio service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private portfolioModel: PortfolioModel,
    private persistenceService: PersistenceService,
    private dataService: DataService,
    private chartService: ChartService,
    private tagCloudProcessorService: TagCloudProcessorService,
    private searchEngineService: SearchEngineService
  ) {
  }

  /**
   * Load data
   */
  LoadData() {
    this.getUi();
    this.getEntities();

    this.getCv();
    this.getProjects();

    this.chartService.initColors();
  }

  /** Loads the CV. */
  private getCv(): void {
    this.dataService.getCv().pipe(take(1)).subscribe((cv) => {
      if (this.isEmpty(cv)) { return; }
      this.cv = cv;
      this.filteredProfessionalExperience = cv['Professional experience'];
      this.filteredEducation = cv.Education;
      this.filteredCertifications = cv.Certifications;
      this.filteredAccomplishments = cv.Courses;
      this.filteredPublications = cv.Publications;
      this.calcCountCache();
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
      entities = {
        ...(Object(entities)),
        ...{
          'Contributions': {
            'node': 'Contributions',
            'parent': '',
            'class': 'hsl7b',
            'main': 'true'
          },
          'Badges': {
            'node': 'Badges',
            'parent': '',
            'class': 'hsl9b',
            'main': 'true'
          }
        }
      };
      this.adjustEntities(entities);
      this.entities = entities;
    });
  }

  /** Loads the UI. */
  private getUi(): void {
    this.dataService.getUi().pipe(take(1)).subscribe((ui) => {
      if (this.isEmpty(ui)) { return; }
      ui = {
        ...(Object(ui)),
        ...{
          'Course delimiter left': {
            'text': '–'
          },
          'Course delimiter right': {
            'text': ''
          },
          'Certificate number delimiter left': {
            'text': '('
          },
          'Certificate number delimiter right': {
            'text': ')'
          },
          'Instant Search': {
            'text': 'Instant search'
          },
          'Expand Badges': {
            'text': 'Expand badges'
          },
          'Coverage sunburst': {
            'text': 'Coverage sunburst'
          },
          'Coverage icicle': {
            'text': 'Coverage icicle'
          },
          'Coverage tree': {
            'text': 'Coverage tree'
          },
          'Rose': {
            'text': '🌹'
          },
          '40 key': {
            'text': 'Astronomy, Skiing & Music'
          },
          '40 value': {
            'text': '40+ years'
          },
          '30 key': {
            'text': 'Computers & English'
          },
          '30 value': {
            'text': '30+ years'
          },
          '20 key': {
            'text': 'Software engineering, Finland, Hiking, Ecology & Birdwatching'
          },
          '20 value': {
            'text': '20+ years'
          },
          '10 key': {
            'text': 'Eclipse chasing'
          },
          '10 value': {
            'text': '10+ years'
          }
        }
      };
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
   * Gets the project period decrypted for a project
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string {
    const period = 'Period';
    return this.decryptedPeriod[project[period]];
  }

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
        if (this.uiDefined() && ['Client', 'Industry', 'Project type', 'System type', 'Country'].includes(key)) {
          entity.section = this.ui.By.text + ' ' + entity.section;
        }

        // pluralise others
        if (['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
          'Role', 'Responsibilities', 'Team size', 'Position', 'Reference'].includes(key)) {
          if (entity.section.substr(entity.section.length - 1) !== 's') {
            entity.section += 's';
          }
        }

        // specially pluralise others
        if (['Methodology and practices'].includes(key)) {
          entity.section = 'Methodologies and Practices';
        }

        // completely change others
        if (['General Timeline Map'].includes(key)) {
          entity.section = '';
        }
        if (['Gantt Chart Map'].includes(key)) {
          entity.section = 'Projects';
        }

        // apply AI to some
        entity.AI = ['Responsibilities'].includes(key);

        // fix encrypted periods when needed
        if (['Modern Age', 'Renaissance', 'Dark Ages'].includes(key)) {
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
    this.countCache = {};

    for (const propertyName of [
      'Client',
      'Country',
      'Industry',
      'Project type',
      'System type',

      'Platform',
      'Architecture',
      'Languages and notations',
      'IDEs and Tools',
      'Methodology and practices',

      'Role',
      // 'Responsibilities',
      'Team size',
      'Position',
      'Reference']) {
      this.calcFrequencies(this.filteredProjects, propertyName);
    }
    this.calcFrequencies(this.filteredProjects, 'Responsibilities', undefined, true);

    this.calcFrequencies(this.filteredAccomplishments, 'Name');
    this.calcFrequencies(this.filteredPublications, 'Title');

    // calc sections start project and count cache
    let i = 0;
    let lastPeriod = '';
    for (const filteredProject of this.filteredProjects) {
      const project = filteredProject as Project;
      const period = this.getDecryptedProjectPeriod(project);
      if (period === lastPeriod) {
        project['New Period'] = '';
      } else {
        project['New Period'] = period;
        this.countCache[lastPeriod] = i;
        lastPeriod = period;
        i = 0;
      }
      i++;
    }
    this.countCache[lastPeriod] = i;

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
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public checkToggleCollapsed(propertyName: string): boolean {
    // if (this.persistenceService.getToggle(propertyName)['content-class'] === 'collapse') {
    //     this.countCache[propertyName] = 0;
    //     this.frequenciesCache[propertyName] = [];
    //     return true;
    // }

    return false;
  }

  /**
   * Calculates a splitter and then delegates to a service to calculate the frequency of occurrence of any value parts
   * in a collection objects' property based on that splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string. Optional.
   * @param ai Whether to apply lexical analysis euristics when parsing each value encountered. Optional.
   *
   * @description
   * Also updates count and caches result.
   */
  private calcFrequencies(collection: any, propertyName: string, splitter: string = ', ', ai: boolean = false) {
    if (this.checkToggleCollapsed(propertyName)) { return; }

    this.countCache[propertyName] = 0;

    const entries = this.tagCloudProcessorService.calcFrequencies(collection, propertyName, splitter, ai);
    if ((typeof entries === 'undefined')) {
      return;
    }

    this.updateCount(propertyName, entries.length);

    this.frequenciesCache[propertyName] = entries;
  }

  /**
   * Updates an entity's count.
   * @param propertyName The name of the property to process.
   * @param count The new count.
   */
  private updateCount(propertyName: string, count: number) {
    if (propertyName === '' || typeof propertyName === 'undefined') {
      return;
    }

    if (typeof this.countCache[propertyName] !== 'number') {
      this.countCache[propertyName] = 0;
    }

    this.countCache[propertyName] += count;

    if (!this.entities || this.entities[propertyName] == null) {
      return;
    }

    const parentEntity = this.entities[propertyName].parent;

    this.updateCount(parentEntity, count);
  }

  /**
   * Calculates the filtered projects for the current search context.
   *
   * @returns The filtered projects for the current search context.
   */
  private calcFilteredProjects(): Indexable<Project>[] {
    if (typeof this.projects === 'undefined') { return []; }

    const retVal = this.calcFiltered<Project>(this.projects);

    return retVal;
  }

  /**
   * Calculates the filtered certifications for the current search context.
   *
   * @returns The filtered certifications for the current search context.
   */
  private calcFilteredCertifications(): Indexable<Course>[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv.Certifications === 'undefined') { return []; }

    const retVal = this.calcFiltered<Course>(this.cv.Certifications);

    return retVal;
  }

  /**
   * Calculates the filtered accomplishments for the current search context.
   *
   * @returns The filtered accomplishments for the current search context.
   */
  private calcFilteredAccomplishments(): Indexable<Course>[] {
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
  private calcFilteredPublications(): Indexable<Publication>[] {
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
  private calcFilteredProfessionalExperience(): Indexable<ProfessionalExperience>[] {
    const retVal = this.calcFiltered<ProfessionalExperience>(this.cv['Professional experience']);

    // console.log('Debug: calcFilteredProfessionalExperience', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered education entries for the current search context.
   *
   * @returns The filtered education entries for the current search context.
   */
  private calcFilteredEducation(): Indexable<Education>[] {
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
  private calcFiltered<T>(array: Array<Indexable<T>>): Array<Indexable<T>> {
    return this.searchEngineService.search(array, this.SearchToken);
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

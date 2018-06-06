import { Meta } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';

import { StringExService } from '../../services/string-ex/string-ex.service';

import { CV } from '../../classes/cv';
import { Project } from '../../classes/project';
import { Entities, Entity } from '../../classes/entities';
import { UI } from '../../classes/ui';

/**
 * Portfolio component
 */
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements AfterViewInit {
  /** Main component name. Used for a base of the internal anchors. */
  public readonly componentName = '';

  /** Frequencies divider object. */
  public readonly frequenciesDivider = '•';

  /** Link-to-this symbol. */
  public readonly linkToThisSymbol = '♦'; // &#9830;, &diams;
  // public readonly linkToThisSymbol = '♢'; // &#9826;

  /** Link-to-this text. */
  public get linkToThisText() { return this.ui && this.ui['Link to this heading'] ? this.ui['Link to this heading'].text : ''; }

  /** CV data. */
  public cv = new CV();
  /** Projects data. */
  private projects = new Array<Project>();
  /** Entities data. */
  public entities = new Entities();
  /** UI data. */
  public ui = new UI();

  /** A map of charts by chart type that are already loaded. */
  private chartLoaded = {};

  /** Aggregation count cache. */
  public countCache = {};

  /** Frequencies cache. */
  private frequenciesCache = {};

  /** Filtered professional experience for the current search context. */
  public filteredProfessionalExperience = [];
  /** Filtered education for the current search context. */
  public filteredEducation = [];

  /** Filtered certifications for the current search context. */
  public filteredCertifications = [];
  /** Filtered accomplishments for the current search context. */
  public filteredAccomplishments = [];
  /** Filtered publications for the current search context. */
  public filteredPublications = [];

  /** Filtered projects for the current search context. */
  public filteredProjects = [];

  /** Tag cloud display mode for the project summary sections. */
  public tagCloudDisplayMode = Object.freeze({ 'tagCloud': 1, 'chart': 2, 'both': 3 });

  /** Tag cloud getter. */
  get tagCloud() {
    return Number.parseInt(localStorage.getItem('tagCloud')) || this.tagCloudDisplayMode.both;
  }
  /** Tag cloud setter. */
  @Input() set tagCloud(value) {
    const refreshNeeded = value === this.tagCloudDisplayMode.tagCloud;

    localStorage.setItem('tagCloud', value.toString());

    if (refreshNeeded) {
      this.refreshCharts();
    }
    this.searchTokenChanged.emit(this._searchToken);
  }

  /** Search query string expression. */
  private _searchToken = '';
  /** Search query string expression getter. */
  get searchToken(): string {
    return this._searchToken;
  }
  /** Search query string expression setter. */
  @Input() set searchToken(value: string) {
    this._searchToken = value;
    this.filteredProjects = this.calcFilteredProjects();
    this.filteredCertifications = this.calcFilteredCertifications();
    this.filteredAccomplishments = this.calcFilteredAccomplishments();
    this.filteredPublications = this.calcFilteredPublications();
    this.filteredProfessionalExperience = this.calcFilteredProfessionalExperience();
    this.filteredEducation = this.calcFilteredEducation();
    this.calcCountCache();
    this.searchTokenChanged.emit(this._searchToken);
  }

  /** Search query string expression changed event. */
  @Output() searchTokenChanged = new EventEmitter<string>();

  /** Data encrypted predicate property. */
  public get dataEncrypted(): boolean {
    return !this.ui || !this.ui['Search'] || this.ui['Search'].text !== 'Search';
  }

  /** Project period decrypted. */
  private readonly decryptedPeriod = {};

  /** Images data location. */
  private readonly images: string = this.dataService.urlResolve('/assets', 'images');
  /** Placeholder image name. */
  private readonly placeholderImageName = 'Empty.png';
  /** Placeholder image delegate. */
  private readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

  /**
   * Constructs the Portfolio component.
   * @param meta The service that can be used to get and add meta tags.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param generalTimelineService The general timeline chart service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   */
  constructor(
    private meta: Meta,
    private dataService: DataService,
    private chartService: ChartService,
    private tagCloudProcessorService: TagCloudProcessorService,
    private excelDateFormatterService: ExcelDateFormatterService,
    private searchEngineService: SearchEngineService) {
    this.meta.addTags([
      { name: 'description', content: 'CV generator tool with BI features' },
      { name: 'author', content: 'Georgi Marinov' },
      { name: 'category', content: 'Personal' },
      { name: 'project type', content: 'Cloud' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ]);
  }

  /** Initialization */
  ngAfterViewInit() {
    this.getUi();
    this.getEntities();

    this.getCv();
    this.getProjects();

    this.chartService.initColors();

    // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline'].forEach(_ => this.restoreToggle(document, _));

    window.onscroll = _ => this.scrollFunction();
  }

  /** Draws a chart.
   * @param chartType The type of the chart.
   * @param chartConfiguration The chart configuration.
   */
  public drawChart(chartType: string, chartConfiguration: any) {
    // console.log('drawChart: chartType:', chartType);
    if (!this.chartLoaded[chartType]) {
      const ctx = this.loadChartContext(this.chartName(chartType));
      // console.log('drawChart: ctx:', ctx);
      if (ctx != null) {
        // console.log('drawChart: chartConfiguration:', chartConfiguration);
        this.chartService.createChart(ctx, chartConfiguration);
        this.chartLoaded[chartType] = true;
      }
    }
  }

  /** Loads the CV. */
  private getCv(): void {
    this.dataService.getCv().subscribe((cv) => {
      if (this.isEmpty(cv)) { return; }
      this.cv = cv;
      this.filteredCertifications = cv.Certifications;
      this.filteredAccomplishments = cv.Courses;
      this.filteredPublications = cv.Publications;
      this.calcCountCache();
    });
  }

  /** Loads the projects. */
  private getProjects(): void {
    this.dataService.getProjects().subscribe((projects) => {
      if (this.isEmpty(projects)) { return; }
      this.projects = projects;
      this.filteredProjects = projects;
      this.calcCountCache();
    });
  }

  /** Loads the entities. */
  private getEntities(): void {
    this.dataService.getEntities().subscribe((entities) => {
      if (this.isEmpty(entities)) { return; }
      this.adjustEntities(entities);
      this.entities = entities;
    });
  }

  /** Loads the UI. */
  private getUi(): void {
    this.dataService.getUi().subscribe((ui) => {
      if (this.isEmpty(ui)) { return; }
      this.ui = ui;
    });
  }

  /**
   * Gets the project period decrypted for a project
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: any): string {
    return this.decryptedPeriod[project['Period']];
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
          entity.section = this.ui['By'].text + ' ' + entity.section;
        }

        // pluralise others
        if (['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
          'Role', 'Resopnsibilities', 'Team size', 'Position', 'Reference'].includes(key)) {
          if (entity.section.substr(entity.section.length - 1) !== 's') {
            entity.section += 's';
          }
        }

        // fix encrypted periods when needed
        if (['Modern Age', 'Renaissance', 'Dark Ages'].includes(key)) {
          this.decryptedPeriod[entity.node] = key;
          entity.node = key;
        }

        // calculate chart name
        entity.chart = this.chartName(key);

        // calculate content name
        entity.content = this.contentName(key);
      }
    }
  }

  /**
   * Names a chart element.
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  private chartName(key: string): string {
    return key + ' chart';
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
   * Names a header aria-labelledby tab.
   * @param key The type of tab.
   *
   * @returns The header aria-labelledby tab name.
   */
  public tabName(key: string): string {
    return key + ' tab';
  }

  /**
   * Gets a project image uri.
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The project image uri.
   */
  public getProjectProjectImageUri(imageName: string, full: boolean = false): string {
    return this.getSafeUri(this.dataService.getProjectProjectImageUri(imageName, full));
  }

  /**
   * Gets a background logo image uri.
   * @param imageName The image name.
   *
   * @returns The background logo image uri.
   */
  getBackgroundLogoImageUri(imageName: string): string {
    return this.getSafeUri(this.dataService.getBackgroundLogoImageUri(imageName));
  }

  /**
   * Gets an asset image.
   * @param imageName The image name.
   *
   * @returns The asset image.
   */
  public getAssetUri(imageName: string): string {
    return this.getSafeUri(this.dataService.getAssetUri(imageName));
  }

  /**
   * Gets a safe uri.
   * @param url The url to process.
   *
   * @returns The safe uri.
   */
  getSafeUri(url: string): string {
    return this.dataEncrypted ? this.placeholderImage : url;
  }

  /**
   * Is empty project image.
   * @param imageName The image name.
   *
   * @returns Whether the project image is empty.
   */
  public isEmptyProjectProjectImage(imageName: string): boolean {
    return imageName === this.placeholderImageName || this.getProjectProjectImageUri(imageName) === this.placeholderImage;
  }

  /**
   * Whether UI is defined.
   *
   * @returns Whether the UI is defined.
   *  */
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

  /**
   * Calculates the number of items in an aggregation string based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string.
   *
   * @returns The number of items in an aggregation string.
   */
  public count(collection: any, propertyName: string, splitter: string = ', '): number {
    const aggregate = this.aggregate(collection, propertyName, splitter);
    const matches = aggregate.match(new RegExp(this.frequenciesDivider, 'g'));
    return matches ? matches.length + 1 : aggregate.length > 0 ? 1 : 0;
  }

  /**
   * Aggregates the value parts in a collection objects' property based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them with the splitter and filters out the blank ones and the repetitions.
   *
   * @returns A string with the aggregated values.
   */
  private aggregate(collection: any, propertyName: string, splitter: string = ', '): string {
    if ((typeof collection === 'undefined')) {
      return '';
    }

    let aggregation = '';

    for (let i = 0; i < collection.length; i++) {
      let propertyValue = collection[i][propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      aggregation = aggregation.concat(propertyValue, splitter);
    }

    const arr = aggregation.split(splitter);

    aggregation = arr
      .filter(function (item: string, pos: number) {
        return item !== '' && arr.indexOf(item) === pos;
      })
      .join(' ' + this.frequenciesDivider + ' ');

    return aggregation;
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

      'Role',
      'Responsibilities',
      'Team size',
      'Position',
      'Reference']) {
      this.calcFrequencies(this.filteredProjects, propertyName);
    }

    this.calcFrequencies(this.filteredAccomplishments, 'Name');
    this.calcFrequencies(this.filteredPublications, 'Title');

    // calc sections start project and count cache
    let i = 0;
    let lastPeriod = '';
    for (const project of this.filteredProjects) {
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

    this.refreshCharts();
  }

  /** Invokes redrawing the charts. */
  private refreshCharts() {
    this.chartLoaded = {};
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
    // if (this.getToggle(propertyName)['content-class'] === 'collapse') {
    //     this.countCache[propertyName] = 0;
    //     this.frequenciesCache[propertyName] = [];
    //     return true;
    // }

    return false;
  }

  /**
   * Calculates a splitter and then delegates to a service to calculate the frequency of occurrence of any value parts in a collection objects' property based on that splitter character/string.
   * Count
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   *
   * @description
   * Also updates count and caches result.
   */
  private calcFrequencies(collection: any, propertyName: string) {
    if (this.checkToggleCollapsed(propertyName)) { return; }

    let splitter = ', ';

    // process special types where no aggregation is needed
    if (['Responsibilities'].includes(propertyName)) {
      splitter = ' ' + splitter + ' ';
    }

    this.countCache[propertyName] = 0;

    const entries = this.tagCloudProcessorService.calcFrequencies(collection, propertyName, splitter);
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
   * Get a javaScript date value from an Excel-format date value.
   *
   * @returns The javaScript date value.
   */
  public getJsDateValueFromExcel(excelDate: any): Date {
    return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
  }

  /**
   * Finds a chart graphics context for a specified id.
   * @param canvasId The chart id to look up context for.
   *
   * @returns The chart graphics context if found.
   */
  private loadChartContext(canvasId: string): CanvasRenderingContext2D {
    if (typeof document === 'undefined' || document == null) { return undefined; }

    const canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    if (typeof canvas === 'undefined' || canvas == null) { return undefined; }

    const ctx = canvas.getContext('2d');
    if (typeof ctx === 'undefined' || ctx == null) { return undefined; }

    return ctx;
  }

  /**
  * Calculates the filtered projects for the current search context.
  *
  * @returns The filtered projects for the current search context.
  */
  /** Calculates the filtered projects for the current search context. */
  private calcFilteredProjects(): any[] {
    if (typeof this.projects === 'undefined') { return []; }

    const retVal = this.calcFiltered(this.projects);

    return retVal;
  }

  /**
   * Calculates the filtered certifications for the current search context.
   *
   * @returns The filtered certifications for the current search context.
   */
  private calcFilteredCertifications(): any[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv['Certifications'] === 'undefined') { return []; }

    const retVal = this.calcFiltered(this.cv['Certifications']);

    return retVal;
  }

  /**
   * Calculates the filtered accomplishments for the current search context.
   *
   * @returns The filtered accomplishments for the current search context.
   */
  private calcFilteredAccomplishments(): any[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv['Courses'] === 'undefined') { return []; }

    const retVal = this.calcFiltered(this.cv['Courses']);

    return retVal;
  }

  /**
   * Calculates the filtered publications for the current search context.
   *
   * @returns The filtered publications for the current search context.
   */
  private calcFilteredPublications(): any[] {
    if (typeof this.cv === 'undefined') { return []; }
    if (typeof this.cv['Publications'] === 'undefined') { return []; }

    const retVal = this.calcFiltered(this.cv['Publications']);

    return retVal;
  }

  /**
   * Calculates the filtered professional experiences for the current search context.
   *
   * @returns The filtered professional experiences for the current search context.
   */
  private calcFilteredProfessionalExperience(): any[] {
    const retVal = this.calcFiltered(this.cv['Professional experience']);

    // console.log('calcFilteredProfessionalExperience', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered education entries for the current search context.
   *
   * @returns The filtered education entries for the current search context.
   */
  private calcFilteredEducation(): any[] {
    const retVal = this.calcFiltered(this.cv['Education']);

    // console.log('calcFilteredEducation', retVal);
    return retVal;
  }

  /**
   * Performs the search.
   * @param array The assay to filter.
   *
   * @returns Filtered array according to the current search context.
   */
  private calcFiltered(array: any[]): any[] {
    return this.searchEngineService.search(array, this.searchToken);
  }

  /**
   * Updates the search with a new search query initiating a new search.
   * @param newValue The new search query.
   */
  public updateSearchToken(newValue: string) {
    // newValue = '\"' + newValue.replace('\"', '\\\"') + '\"';
    this.searchToken = newValue;
  }

  /**
    * Saves the toggle state of a heading section.
    * @param event The click event initiating the save.
    */
  saveToggle(event) {
    this.setToggle(event.currentTarget.attributes.id.nodeValue);
    this.setTitle(event.currentTarget);
  }

  /**
   * Restores the toggle state of a heading section.
   * @param document The document to search for a content element.
   * @param typeName The section to process.
   * @param contentName The content name of the element to look up.
   */
  restoreToggle(document, typeName, contentName?) {
    if (!this.entities || !this.entities[typeName]) { return; }

    if (contentName === undefined) { contentName = this.entities[typeName].content; }

    const toggle = this.getToggle(typeName)['content-class'];

    const contentElement = document.getElementById(contentName);
    // console.log('restoreToggle: contentName:', contentName, 'contentElement:', contentElement);
    if (contentElement) {
      contentElement.className = toggle;
    }

    const typeElement = document.getElementById(typeName);
    // console.log('restoreToggle: typeName:', typeName, 'typeElement:', typeElement);
    if (typeElement) {
      if (toggle === 'collapse') {
        typeElement.className = 'collapsed';
      }
      this.setTitle(typeElement, _ => !_);
    }
  }

  /**
   * Retrieves the toggle state of a heading section from persistent storage.
   * @param key The section to process.
   *
   * @returns The toggle state retrieved.
   */
  private getToggle(key): any {
    return JSON.parse(localStorage.getItem(key)) || { 'content-class': 'collapse show' };
  }

  /**
   * Saves the toggle state of a heading section to persistent storage.
   * @param key The section to process.
   */
  private setToggle(key) {
    const o = this.getToggle(key);
    o['content-class'] = o['content-class'] === 'collapse show' ? 'collapse' : 'collapse show';

    localStorage.setItem(key, JSON.stringify(o));
  }

  /**
   * Sets a tooltip title to a heading element.
   * @param element The element to process.
   * @param f The function to apply to the state: defaults to repeater but can be inverter.
   */
  private setTitle(element: HTMLElement, f: (_: boolean) => boolean = _ => _) {
    if (element) {
      element.title = this.calcTitle(f(element.classList.contains('collapsed')));
    }
  }

  /**
   * Calculates the tooltip title of a heading element based on state.
   * @param condition The state to calculate the tooltip title from.
   */
  private calcTitle(condition: boolean): string {
    return this.ui[condition ? 'Collapse this heading' : 'Expand this heading'].text;
  }

  /** Show scroll to top button when told so. */
  private scrollFunction() {
    const scrollTopThreshold = 20;
    const button = document.getElementById('goToTopBtn');
    if (button) {
      button.style.display =
        (document.body.scrollTop > scrollTopThreshold
          || document.documentElement.scrollTop > scrollTopThreshold)
          ? 'block' : 'none';
    }
  }

  /** Scroll to top. */
  private goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  /** Replace all delegate. */
  public replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
  /** To title case delegate. */
  private toTitleCase(str) { return StringExService.toTitleCase(str); }
}

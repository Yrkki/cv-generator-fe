import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { Indexable } from '../../interfaces/indexable';
import { Project } from '../../interfaces/project/project';

/**
 * Portfolio component
 * ~implements {@link AfterViewInit}
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

  /** Non-breaking space character */
  protected get nonBreakingSpace() { return '\u00A0'; }
  // protected get nonBreakingSpace() { return '\u202F'; }

  /** Short date format */
  public get dateFormatShort() { return 'yyyy'; }

  /** Middle date format */
  public get dateFormatMiddle() { return 'MM.yyyy'; }

  /** Long date format */
  public get dateFormatLong() { return 'MMMM' + this.nonBreakingSpace + 'yyyy'; }

  /** Default shorter date format */
  public get dateFormatShorter() { return this.decorations ? this.dateFormatMiddle : this.dateFormatShort; }

  /** Default longer date format */
  public get dateFormatLonger() { return this.decorations ? this.dateFormatLong : this.dateFormatMiddle; }

  /** Link-to-this text. */
  public get linkToThisText() { return this.ui && this.ui['Link to this heading'] ? this.ui['Link to this heading'].text : ''; }

  /** CV getter. */
  public get cv() { return this.portfolioService.cv; }
  /** CV setter. */
  public set cv(value) { this.portfolioService.cv = value; }

  /** Entities getter. */
  public get entities() { return this.portfolioService.entities; }
  /** Entities setter. */
  public set entities(value) { this.portfolioService.entities = value; }

  /** Projects getter. */
  public get projects() { return this.portfolioService.projects; }
  /** Projects setter. */
  public set projects(value) { this.portfolioService.projects = value; }

  /** UI data getter. */
  public get ui() { return this.portfolioService.ui; }
  /** UI data setter. */
  public set ui(value) { this.portfolioService.ui = value; }

  /** A map of charts by chart type that are already loaded. */
  /** Charts map getter. */
  public get chartLoaded() { return this.portfolioService.chartLoaded; }
  /** Charts map setter. */
  public set chartLoaded(value) { this.portfolioService.chartLoaded = value; }

  /** Aggregation count cache. */
  /** Aggregation count cache getter. */
  public get countCache() { return this.portfolioService.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.portfolioService.countCache = value; }

  /** Filtered professional experience for the current search context. */
  /** Filtered professional getter. */
  public get filteredProfessionalExperience() { return this.portfolioService.filteredProfessionalExperience; }
  /** Filtered professional setter. */
  public set filteredProfessionalExperience(value) { this.portfolioService.filteredProfessionalExperience = value; }
  /** Filtered education for the current search context. */
  /** Filtered education getter. */
  public get filteredEducation() { return this.portfolioService.filteredEducation; }
  /** Filtered education setter. */
  public set filteredEducation(value) { this.portfolioService.filteredEducation = value; }

  /** Filtered certifications for the current search context. */
  /** Filtered certifications getter. */
  public get filteredCertifications() { return this.portfolioService.filteredCertifications; }
  /** Filtered certifications setter. */
  public set filteredCertifications(value) { this.portfolioService.filteredCertifications = value; }
  /** Filtered accomplishments for the current search context. */
  /** Filtered accomplishments getter. */
  public get filteredAccomplishments() { return this.portfolioService.filteredAccomplishments; }
  /** Filtered accomplishments setter. */
  public set filteredAccomplishments(value) { this.portfolioService.filteredAccomplishments = value; }
  /** Filtered publications for the current search context. */
  /** Filtered publications getter. */
  public get filteredPublications() { return this.portfolioService.filteredPublications; }
  /** Filtered publications setter. */
  public set filteredPublications(value) { this.portfolioService.filteredPublications = value; }

  /** Filtered projects for the current search context. */
  /** Filtered projects getter. */
  public get filteredProjects() { return this.portfolioService.filteredProjects; }
  /** Filtered projects setter. */
  public set filteredProjects(value) { this.portfolioService.filteredProjects = value; }

  /** Header link default template reference. */
  @ViewChild('defaultHeaderLink') defaultHeaderLink?: TemplateRef<any>;

  /** Section counter default template reference. */
  @ViewChild('defaultSectionCounter') defaultSectionCounter?: TemplateRef<any>;

  /** Search query string expression getter. */
  public get SearchToken(): string {
    return this.portfolioService.SearchToken;
  }
  /** Search query string expression setter. */
  @Input() public set SearchToken(value: string) {
    this.portfolioService.SearchToken = value;
  }

  /** Search query string expression changed event. */
  @Output() readonly searchTokenChanged$ = this.portfolioService.searchTokenChanged$;

  /** Data encrypted predicate property. */
  public get dataEncrypted(): boolean {
    return this.portfolioService.dataEncrypted;
  }

  /** Tag cloud display mode for the project summary sections. */
  public tagCloudDisplayMode = Object.freeze({ 'tagCloud': 1, 'chart': 2, 'both': 3 });

  /** The tag cloud element. */
  @ViewChild('tagCloudElement') tagCloudElement?: ElementRef;

  /** The chart tag cloud element. */
  @ViewChild('chartElement') chartElement?: ElementRef;

  /** The both tag cloud element. */
  @ViewChild('bothElement') bothElement?: ElementRef;

  /** Curriculum Vitae clickable element. */
  @ViewChild('clickableCurriculumVitae') clickableCurriculumVitae?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Decorations decorated clickable element. */
  @ViewChild('clickableDecorationsDecorated') clickableDecorationsDecorated?: ElementRef;

  /** Decorations clickable element. */
  @ViewChild('clickableDecorations') clickableDecorations?: ElementRef;

  /** Gantt chart map clickable element. */
  @ViewChild('clickableGanttChartMap') clickableGanttChartMap?: ElementRef;

  /** Project summary clickable element. */
  @ViewChild('clickableProjectSummary') clickableProjectSummary?: ElementRef;

  /** Mode decorated clickable element. */
  @ViewChild('clickableModeDecorated') clickableModeDecorated?: ElementRef;

  /** Mode clickable element. */
  @ViewChild('clickableMode') clickableMode?: ElementRef;

  /** Tag cloud clickable element. */
  @ViewChild('clickableTagCloud') clickableTagCloud?: ElementRef;

  /** Chart clickable element. */
  @ViewChild('clickableChart') clickableChart?: ElementRef;

  /** Both clickable element. */
  @ViewChild('clickableBoth') clickableBoth?: ElementRef;

  /** Project portfolio clickable element. */
  @ViewChild('clickableProjectPortfolio') clickableProjectPortfolio?: ElementRef;

  /** Go to top clickable element. */
  @ViewChild('clickableGoToTop') clickableGoToTop?: ElementRef;

  /** Tag cloud getter. */
  get tagCloud(): number {
    return Number.parseInt(localStorage.getItem('tagCloud') ?? '0', 10) || this.tagCloudDisplayMode.tagCloud;
  }
  /** Tag cloud setter. */
  @Input() set tagCloud(value: number) {
    localStorage.setItem('tagCloud', value.toString());

    this.refreshCharts();
    this.searchTokenChanged$.emit(this.SearchToken);
  }

  /** The decorations element. */
  @ViewChild('decorationsElement') decorationsElement?: ElementRef;

  /** Decorations getter. */
  get decorations() {
    return localStorage.getItem('decorations') === 'true';
  }
  /** Decorations setter. */
  @Input() set decorations(value) {
    localStorage.setItem('decorations', value.toString());
  }

  /** Images data location. */
  private readonly images: string = this.dataService.urlResolve('/assets', 'images');
  /** Placeholder image name. */
  private readonly placeholderImageName = 'Empty.png';
  /** Placeholder image delegate. */
  private readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

  /** The projects accomplishment target element. */
  @ViewChild('projectsAccomplishment') projectsAccomplishment?: ElementRef;

  /** The state of the dependencies determining whether should collapse the projects accomplishments section. */
  private projectsAccomplishmentShouldCollapseState: Indexable<boolean> = {};

  /** The property bound to the collapsed state of the project accomplishments section. */
  public get projectsAccomplishmentClassList(): string {
    return Object.values(this.projectsAccomplishmentShouldCollapseState).includes(true) ? 'collapse' : 'collapse show';
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
      this.getToggle(typeName)?.['content-class'] === 'collapse';
  }

  /**
   * Constructs the Portfolio component.
   * ~constructor
   *
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private portfolioService: PortfolioService,

    private dataService: DataService,
    private chartService: ChartService,
    private excelDateFormatterService: ExcelDateFormatterService
  ) {
    // console.log('Debug: PortfolioComponent: constructor: constructing...');
  }

  /**
   * Initialization
   * @param mockDataService The mock data service for testing.
   */
  ngAfterViewInit(mockDataService?: MockDataService) {
    this.LoadData(mockDataService);
  }

  /**
   * Load data
   * @param mockDataService The mock data service for testing.
   */
  LoadData(mockDataService?: MockDataService) {
    if (mockDataService) { this.dataService = mockDataService; }

    this.portfolioService.LoadData();

    // initialize whether should collapse the projects accomplishments section
    this.updateShouldCollapseProjectsAccomplishment('Accomplishments');

    // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline'].forEach(_ => this.restoreToggle(document, _));

    globalThis.onscroll = _ => this.scrollFunction();
  }

  /** Draws a chart.
   * @param chartType The type of the chart.
   * @param chartConfiguration The chart configuration.
   */
  public drawChart(chartType: string, chartConfiguration: any) {
    // console.log('Debug: drawChart: chartType:', chartType);
    if (!this.chartLoaded[chartType]) {
      const ctx = this.loadChartContext(this.chartName(chartType));
      // console.log('Debug: drawChart: ctx:', ctx);
      if (ctx != null && ctx !== undefined) {
        // console.log('Debug: drawChart: chartConfiguration:', chartConfiguration);
        this.chartService.createChart(ctx, chartConfiguration);
        this.chartLoaded[chartType] = true;
      }
    }
  }

  /**
   * One person team project indicator.
   * ~delegate
   * @param project The project index
   */
  public getProjectIsOnePersonTeam(project: Project): boolean {
    return this.portfolioService.getProjectIsOnePersonTeam(project);
  }

  /**
   * Project starts new period indicator.
   * @param project The project index
   */
  public getProjectStartsNewPeriod(project: Project): boolean {
    return this.portfolioService.getProjectIsOnePersonTeam(project);
  }

  /**
   * Gets the project period decrypted for a project
   * ~delegate
   * @param project The project index
   */
  public getDecryptedProjectPeriod(project: Project): string {
    return this.portfolioService.getDecryptedProjectPeriod(project);
  }

  /**
   * Names a chart element.
   * ~delegate
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  private chartName(key: string): string {
    return this.portfolioService.chartName(key);
  }

  /**
   * Names a header aria-labelledby tab.
   * @param key The type of tab.
   *
   * @returns The header aria-labelledby tab name.
   */
  public tabName(key: string): string {
    return this.replaceAll(key + ' tab', ' ', '_');
  }

  /**
   * Names an aria-label link.
   * @param key The type of link.
   *
   * @returns The aria-label link name.
   */
  public linkLabel(key: string | undefined): string {
    if ( key === undefined ) { return ''; }
    return this.replaceAll(key + ' link', ' ', '_');
  }

  /**
   * Labels an element.
   * @param key The type of label.
   *
   * @returns The label name.
   */
  public label(key: string): string {
    return this.replaceAll(key + ' label', ' ', '_');
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
   * ~delegate
   *
   * @returns Whether the UI is defined.
   */
  uiDefined(): boolean {
    return this.portfolioService.uiDefined();
  }

  /**
   *  Whether entities are defined.
   * ~delegate
   *
   * @returns Whether the entities are defined.
   */
  entitiesDefined(): boolean {
    return this.portfolioService.entitiesDefined();
  }

  /**
   *  Whether CV is defined.
   * ~delegate
   *
   * @returns Whether the CV is defined.
   */
  cvDefined(): boolean {
    return this.portfolioService.cvDefined();
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
   *  Whether the general timeline is defined.
   * ~delegate
   *
   * @returns Whether the general timeline is defined.
   */
  generalTimelineDefined(): boolean {
    return this.portfolioService.generalTimelineDefined();
  }
  /**
   * Whether a specific json is defined.
   * ~delegate
   * @param json The json to check.
   *
   * @returns Whether the json is defined.
   */
  public jsonDefined(json: any): boolean {
    return this.portfolioService.jsonDefined(json);
  }

  /**
   * Whether an object is empty.
   * ~delegate
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: object): boolean {
    return this.portfolioService.isEmpty(obj);
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
  public count(collection: Indexable[], propertyName: string, splitter: string = ', '): number {
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
   * For a given object property name in the collection of objects, extracts the values, concatenates them with the splitter
   * and filters out the blank ones and the repetitions.
   *
   * @returns A string with the aggregated values.
   */
  private aggregate(collection: Indexable[], propertyName: string, splitter: string = ', '): string {
    if ((typeof collection === 'undefined')) {
      return '';
    }

    let aggregation = '';

    for (const property of collection) {
      let propertyValue = property[propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      aggregation = aggregation.concat(propertyValue, splitter);
    }

    const arr = aggregation.split(splitter);

    aggregation = arr
      .filter((item: string, pos: number) => item !== '' && arr.indexOf(item) === pos)
      .join(' ' + this.frequenciesDivider + ' ');

    return aggregation;
  }

  /**
   * Invokes redrawing the charts.
   * ~delegate
   */
  public refreshCharts() {
    this.portfolioService.refreshCharts();
  }

  /**
   * Gets the calculated frequencies object for an entity.
   * ~delegate
   * @param project The entity.
   *
   * @returns The calculated frequencies object for an entity.
   */
  public getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /**
   * Checkes if the section toggle state is collapsed.
   * ~delegate
   * @param propertyName The name of the property to process.
   *
   * @returns Whether the section toggle state is collapsed.
   */
  public checkToggleCollapsed(propertyName: string): boolean {
    return this.portfolioService.checkToggleCollapsed(propertyName);
  }

  /**
   * Get a javaScript date value from an Excel-format date value.
   * ~delegate
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
  private loadChartContext(canvasId: string): CanvasRenderingContext2D | undefined {
    if (typeof document === 'undefined' || document == null) { return undefined; }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    // console.log('Debug: loadChartContext: canvas: ', canvas);
    if (typeof canvas === 'undefined' || canvas == null) { return undefined; }

    const ctx = canvas.getContext('2d');
    // console.log('Debug: loadChartContext: ctx: ', ctx);
    if (typeof ctx === 'undefined' || ctx == null) { return undefined; }

    return ctx;
  }

  /**
   * Updates the search with a new search query initiating a new search.
   * ~delegate
   * @param newValue The new search query.
   */
  public updateSearchToken(newValue: string) {
    this.portfolioService.updateSearchToken(newValue);
  }

  /**
   * Saves the toggle state of a heading section.
   * @param event The click event initiating the save.
   */
  saveToggle(event: MouseEvent) {
    const targetElement = event.currentTarget as HTMLElement;
    if (!targetElement) { return; }
    this.setToggle(targetElement.attributes.getNamedItem('id')?.nodeValue ?? '');
    this.setTitle(targetElement);
  }

  /**
   * Restores the toggle state of a heading section.
   * @param document The document to search for a content element.
   * @param typeName The section to process.
   */
  restoreToggle(document: Document, typeName: string) {
    if (!this.entities || !this.entities[typeName]) { return; }

    const contentName = this.entities[typeName].content;

    const toggle = this.getToggle(typeName)?.['content-class'];

    const contentElement = document.getElementById(contentName);
    // console.log('Debug: restoreToggle: contentName:', contentName, 'contentElement:', contentElement);
    if (contentElement) {
      contentElement.className = toggle;
    }

    const typeElement = document.getElementById(typeName);
    // console.log('Debug: restoreToggle: typeName:', typeName, 'typeElement:', typeElement);
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
  private getToggle(key: string): any {
    const o = { 'content-class': 'collapse show' };
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(o)) || o;
  }

  /**
   * Saves the toggle state of a heading section to persistent storage.
   * @param key The section to process.
   */
  private setToggle(key: string) {
    const o = this.getToggle(key);
    if (!o) { return; }

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
    return this.ui[condition ? 'Collapse this heading' : 'Expand this heading']?.text;
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
  public goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  /** Replace all delegate. */
  public replaceAll(str: string | undefined, search: string | RegExp, replacement: any): string {
    if (!str) { return ''; }
    return StringExService.replaceAll(str, search, replacement);
  }

  /** Simulate keyboard clicks. */
  public keypress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (event.target) {
          event.target.dispatchEvent(new MouseEvent('click'));
        }
        break;
    }
  }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }
}

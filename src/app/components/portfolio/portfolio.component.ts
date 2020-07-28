import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { Indexable } from '../../interfaces/indexable';
import { Project } from '../../interfaces/project/project';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

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
  public get componentName() { return this.uiService.componentName; }

  /** Frequencies divider object. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Link-to-this symbol. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }

  /** Non-breaking space character */
  public get nonBreakingSpace() { return this.uiService.nonBreakingSpace; }

  /** Short date format */
  public get dateFormatShort() { return this.uiService.dateFormatShort; }

  /** Middle date format */
  public get dateFormatMiddle() { return this.uiService.dateFormatMiddle; }

  /** Long date format */
  public get dateFormatLong() { return this.uiService.dateFormatLong; }

  /** Link-to-this text. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

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
    return this.uiService.dataEncrypted;
  }

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

  /** The decorations element. */
  @ViewChild('decorationsElement') decorationsElement?: ElementRef;

  /** The projects accomplishment target element. */
  @ViewChild('projectsAccomplishment') projectsAccomplishment?: ElementRef;

  /** Tag cloud display mode. */
  public TagCloudDisplayMode = TagCloudDisplayMode;

  /** Tag cloud getter delegate. */
  public get tagCloud(): TagCloudDisplayMode { return this.portfolioService.tagCloud; }
  /** Tag cloud setter delegate. */
  @Input() public set tagCloud(value: TagCloudDisplayMode) { this.portfolioService.tagCloud = value; }

  /** Decorations getter delegate. */
  public get decorations() { return this.portfolioService.decorations; }
  /** Decorations setter delegate. */
  @Input() public set decorations(value) { this.portfolioService.decorations = value; }

  /** Placeholder image name delegate. */
  private get placeholderImageName() { return this.uiService.placeholderImageName; }
  /** Placeholder image delegate. */
  private get placeholderImage() { return this.uiService.placeholderImage; }

  /** The property bound to the collapsed state of the project accomplishments section delegate. */
  public get projectsAccomplishmentClassList() { return this.accomplishmentsService.projectsAccomplishmentClassList; }

  /**
   * Constructs the Portfolio component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    private portfolioService: PortfolioService,
    private accomplishmentsService: AccomplishmentsService,
    protected entitiesService: EntitiesService,
    private inputService: InputService,
    private uiService: UiService,
    private persistenceService: PersistenceService,

    private dataService: DataService,
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

    // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline']
    //   .forEach(_ => this.persistenceService.restoreToggle(document, _));

    globalThis.onscroll = _ => this.scrollFunction();
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
    if (key === undefined) { return ''; }
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
  public getBackgroundLogoImageUri(imageName: string): string {
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
  public getSafeUri(url: string): string {
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
  public uiDefined(): boolean {
    return this.portfolioService.uiDefined();
  }

  /**
   *  Whether entities are defined.
   * ~delegate
   *
   * @returns Whether the entities are defined.
   */
  public entitiesDefined(): boolean {
    return this.portfolioService.entitiesDefined();
  }

  /**
   *  Whether CV is defined.
   * ~delegate
   *
   * @returns Whether the CV is defined.
   */
  public cvDefined(): boolean {
    return this.portfolioService.cvDefined();
  }

  /**
   *  Whether projects are defined.
   * ~delegate
   *
   * @returns Whether the projects are defined.
   */
  public projectsDefined(): boolean {
    return this.portfolioService.projectsDefined();
  }

  /**
   *  Whether the general timeline is defined.
   * ~delegate
   *
   * @returns Whether the general timeline is defined.
   */
  public generalTimelineDefined(): boolean {
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
   * ~delegate
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string.
   *
   * @returns The number of items in an aggregation string.
   */
  public count(collection: Indexable[], propertyName: string, splitter: string = ', '): number {
    return this.entitiesService.count(collection, propertyName, splitter);
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
   * ~delegate
   * @param event The click event initiating the save.
   */
  public saveToggle(event: MouseEvent) { return this.persistenceService.saveToggle(event); }

  /**
   * Restores the toggle state of a heading section.
   * ~delegate
   * @param document The document to search for a content element.
   * @param typeName The section to process.
   */
  private restoreToggle(document: Document, typeName: string) { this.persistenceService.restoreToggle(document, typeName); }

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

  /**
   * Simulate keyboard clicks.
   * ~delegate
   * @param event The keyboard event.
   */
  public keypress(event: KeyboardEvent) {
    return this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

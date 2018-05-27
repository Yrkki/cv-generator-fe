import { Meta } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';

import { StringExService } from '../../services/string-ex/string-ex.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit, AfterViewInit {
  /** Main component name delegate */
    public readonly componentName = '';

    public readonly frequenciesDivider = '•';

    public readonly linkToThisSymbol = '♦'; // &#9830;, &diams;
    // public readonly linkToThisSymbol = '♢'; // &#9826;

    public get linkToThisText() { return this.ui ? this.ui['Link to this heading'].text : ''; }

    public cv: any;
    private projects: any;
    public entities: any;
    public ui: any;
    public generalTimeline: any;

    private chartLoaded = {};

    public countCache = {};

    private frequenciesCache = {};

    private filteredProfessionalExperience = [];
    private filteredEducation = [];

    public filteredCertifications = [];
    public filteredAccomplishments = [];
    public filteredPublications = [];

    public filteredProjects = [];

    public filteredTimelineEvents = [];

    public tagCloudDisplayMode = Object.freeze({ 'tagCloud': 1, 'chart': 2, 'both': 3 });

    // @ViewChild('headerLink') headerLink: TemplateRef<any>;

    get tagCloud() {
        return Number.parseInt(localStorage.getItem('tagCloud')) || this.tagCloudDisplayMode.both;
    }
    @Input() set tagCloud(value) {
        const refreshNeeded = value === this.tagCloudDisplayMode.tagCloud;

        localStorage.setItem('tagCloud', value.toString());

        if (refreshNeeded) {
            this.refreshCharts();
        }
        this.searchTokenChanged.emit(this._searchToken);
    }

    private _searchToken = '';
    get searchToken(): string {
        return this._searchToken;
    }
    @Input() set searchToken(value: string) {
        this._searchToken = value;
        this.filteredProjects = this.calcFilteredProjects();
        this.filteredCertifications = this.calcFilteredCertifications();
        this.filteredAccomplishments = this.calcFilteredAccomplishments();
        this.filteredPublications = this.calcFilteredPublications();
        this.filteredProfessionalExperience = this.calcFilteredProfessionalExperience();
        this.filteredEducation = this.calcFilteredEducation();
        this.filteredTimelineEvents = this.calcFilteredTimelineEvents();
        this.calcCountCache();
        this.searchTokenChanged.emit(this._searchToken);

        this.drawGeneralTimeline();
    }

    @Output() searchTokenChanged = new EventEmitter<string>();

    public get dataEncrypted(): boolean {
        return !this.entities || this.entities.Education.node !== 'Education';
    }

    private readonly decryptedPeriod = {};

    private readonly images: string = this.dataService.urlResolve('/assets', 'images');
    private readonly placeholderImageName = 'Empty.png';
    private readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

    constructor(
        private meta: Meta,
        private dataService: DataService,
        private chartService: ChartService,
        private generalTimelineService: GeneralTimelineService,
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

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getUi();
        this.getEntities();

        this.getCv();
        this.getProjects();

        this.getGeneralTimeline();

        this.chartService.initColors();

        // ['Curriculum Vitae', 'Project Summary', 'Project Portfolio', 'General Timeline'].forEach(_ => this.restoreToggle(document, _));
    }

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

    private getProjects(): void {
        this.dataService.getProjects().subscribe((projects) => {
            if (this.isEmpty(projects)) { return; }
            this.projects = projects;
            this.filteredProjects = projects;
            this.calcCountCache();
        });
    }

    private getEntities(): void {
        this.dataService.getEntities().subscribe((entities) => {
            if (this.isEmpty(entities)) { return; }
            this.adjustEntities(entities);
            this.entities = entities;
        });
    }

    private getUi(): void {
        this.dataService.getUi().subscribe((ui) => {
            if (this.isEmpty(ui)) { return; }
            this.ui = ui;
        });
    }

    private getGeneralTimeline(): void {
        this.dataService.getGeneralTimeline().subscribe((generalTimeline) => {
            if (this.isEmpty(generalTimeline)) { return; }
            this.generalTimeline = generalTimeline;
            this.filteredTimelineEvents = generalTimeline;
            // console.log('getGeneralTimeline:', 'this.filteredTimelineEvents:', this.filteredTimelineEvents);
            this.drawGeneralTimeline();
        });
    }

    public getDecryptedProjectPeriod(project): string {
        return this.decryptedPeriod[project['Period']];
    }

    private adjustEntities(entities: any) {
        for (const key in entities) {
            if (entities.hasOwnProperty(key)) {
                const entity = entities[key];

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

    private chartName(key: string): string {
        return key + ' chart';
    }

    private contentName(key: string): string {
        return this.replaceAll(key + ' content', ' ', '_');
    }

    public tabName(key: string): string {
        return key + ' tab';
    }

    public getProjectProjectImageUri(imageName: string, full: boolean = false) {
        return this.getSafeUri(this.dataService.getProjectProjectImageUri(imageName, full));
    }

    getBackgroundLogoImageUri(imageName: string) {
        return this.getSafeUri(this.dataService.getBackgroundLogoImageUri(imageName));
    }

    public getAssetUri(imageName: string) {
        return this.getSafeUri(this.dataService.getAssetUri(imageName));
    }

    getSafeUri(url: string) {
        return this.dataEncrypted ? this.placeholderImage : url;
    }

    public isEmptyProjectProjectImage(imageName: string): boolean {
        return imageName === this.placeholderImageName || this.getProjectProjectImageUri(imageName) === this.placeholderImage;
    }

    uiDefined(): boolean {
        return this.jsonDefined(this.ui);
    }

    entitiesDefined(): boolean {
        return this.jsonDefined(this.entities);
    }

    cvDefined(): boolean {
        return this.jsonDefined(this.cv);
    }

    projectsDefined(): boolean {
        return this.jsonDefined(this.projects);
    }

    private jsonDefined(json: any): boolean {
        return typeof json !== 'undefined' && !this.isEmpty(json);
    }

    private isEmpty(obj): boolean {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    public count(collection: any, propertyName: string, splitter: string = ', '): number {
        const aggregate = this.aggregate(collection, propertyName, splitter);
        const matches = aggregate.match(new RegExp(this.frequenciesDivider, 'g'));
        return matches ? matches.length + 1 : aggregate.length > 0 ? 1 : 0;
    }

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
            .filter(function (item, pos) {
                return item !== '' && arr.indexOf(item) === pos;
            })
            .join(' ' + this.frequenciesDivider + ' ');

        return aggregation;
    }

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

    private refreshCharts() {
        this.chartLoaded = {};
    }

    public getFrequenciesCache(propertyName: string): any[] {
        return this.frequenciesCache[propertyName];
    }

    public checkToggleCollapsed(propertyName: string): boolean {
        // if (this.getToggle(propertyName)['content-class'] === 'collapse') {
        //     this.countCache[propertyName] = 0;
        //     this.frequenciesCache[propertyName] = [];
        //     return true;
        // }

        return false;
    }

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

    public getJsDateValueFromExcel(excelDate: any) {
        return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
    }

    private loadChartContext(canvasId: string) {
        if (typeof document === 'undefined' || document == null) { return; }

        const canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        if (typeof canvas === 'undefined' || canvas == null) { return; }

        const ctx = canvas.getContext('2d');
        if (typeof ctx === 'undefined' || ctx == null) { return; }

        return ctx;
    }

    private calcFilteredProjects() {
        if (typeof this.projects === 'undefined') { return []; }

        const retVal = this.calcFiltered(this.projects);

        return retVal;
    }

    private calcFilteredCertifications() {
        if (typeof this.cv === 'undefined') { return []; }
        if (typeof this.cv.Certifications === 'undefined') { return []; }

        const retVal = this.calcFiltered(this.cv.Certifications);

        return retVal;
    }

    private calcFilteredAccomplishments() {
        if (typeof this.cv === 'undefined') { return []; }
        if (typeof this.cv.Courses === 'undefined') { return []; }

        const retVal = this.calcFiltered(this.cv.Courses);

        return retVal;
    }

    private calcFilteredPublications() {
        if (typeof this.cv === 'undefined') { return []; }
        if (typeof this.cv.Publications === 'undefined') { return []; }

        const retVal = this.calcFiltered(this.cv.Publications);

        return retVal;
    }

    private calcFilteredProfessionalExperience() {
        const retVal = this.calcFiltered(this.cv['Professional experience']);

        // console.log('calcFilteredProfessionalExperience', retVal);
        return retVal;
    }

    private calcFilteredEducation() {
        const retVal = this.calcFiltered(this.cv.Education);

        // console.log('calcFilteredEducation', retVal);
        return retVal;
    }

    private calcFilteredTimelineEvents() {
        if (typeof this.generalTimeline === 'undefined') { return []; }

        const retVal = [].concat(
            this.calcFilteredTimelineEventsPart(this.filteredProfessionalExperience, 'Experience'),
            this.calcFilteredTimelineEventsPart(this.filteredEducation, 'Education'),
            this.calcFilteredTimelineEventsPart(this.filteredCertifications, 'Certification'),
            this.calcFilteredTimelineEventsPart(this.filteredAccomplishments, 'Accomplishment'),
            this.calcFilteredTimelineEventsPart(this.filteredPublications, 'Publication'),
            this.calcFilteredTimelineEventsPart(this.filteredProjects, 'Project')
        );

        // console.log('calcFilteredTimelineEvents', retVal);
        return retVal;
    }

    private calcFilteredTimelineEventsPart(arrFiltered: any[], type: string): any[] {
        const outArray = [];

        for (const timelineEvent of this.generalTimeline.filter(_ => _.Type === type)) {
            for (const filteredElement of arrFiltered) {
                if (filteredElement.Id === timelineEvent.Id) {
                    outArray.push(timelineEvent);
                    break;
                }
            }
        }

        return outArray;
    }

    private calcFiltered(array: any[]) {
        return this.searchEngineService.search(array, this.searchToken);
    }

    public updateSearchToken(newValue: string) {
        // newValue = '\"' + newValue.replace('\"', '\\\"') + '\"';
        this.searchToken = newValue;
    }

    public drawGeneralTimeline() {
        const chartType = 'General Timeline';
        const data = this.generalTimeline;
        if (data != null) {
            // console.log('drawGeneralTimeline: data:', data, 'this.filteredTimelineEvents:', this.filteredTimelineEvents);
            this.drawChart(chartType, this.generalTimelineService.addChart(data, this.filteredTimelineEvents));
        }
    }

    saveToggle(event) {
        this.setToggle(event.currentTarget.attributes.id.nodeValue);
        this.setTitle(event.currentTarget);
    }

    restoreToggle(document, typeName, contentName?) {
        if (!this.entities) { return; }

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

    private getToggle(key): any {
        return JSON.parse(localStorage.getItem(key)) || { 'content-class': 'collapse show' };
    }

    private setToggle(key) {
        const o = this.getToggle(key);
        o['content-class'] = o['content-class'] === 'collapse show' ? 'collapse' : 'collapse show';

        localStorage.setItem(key, JSON.stringify(o));
    }

    private setTitle(element: HTMLElement, f: (_: boolean) => boolean = _ => _) {
        const heading = <HTMLHeadingElement>element.childNodes[1];
        if (heading) {
            heading.title = this.calcTitle(f(element.classList.contains('collapsed')));
        }
    }

    private calcTitle(condition: boolean): string {
        return this.ui[condition ? 'Collapse this heading' : 'Expand this heading'].text;
    }

    public replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
    private toTitleCase(str) { return StringExService.toTitleCase(str); }
}

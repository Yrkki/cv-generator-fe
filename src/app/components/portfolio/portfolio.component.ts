import { Meta } from '@angular/platform-browser';
import { Component, Inject, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { StringExService } from '../../services/string-ex/string-ex.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit, AfterViewInit {
    public readonly componentName = '';

    public readonly frequenciesDivider = '•';

    public cv: any;
    private projects: any;
    public entities: any;
    public ui: any;

    private chartLoaded = {};

    public countCache = {};

    private frequenciesCache = {};
    public filteredProjects = [];

    public filteredAccomplishments = [];
    public filteredPublications = [];

    public tagCloudDisplayMode = Object.freeze({ 'tagCloud': 1, 'chart': 2, 'both': 3 });

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
        this.filteredAccomplishments = this.calcFilteredAccomplishments();
        this.filteredPublications = this.calcFilteredPublications();
        this.calcCountCache();
        this.searchTokenChanged.emit(this._searchToken);
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
        private tagCloudProcessorService: TagCloudProcessorService,
        private excelDateFormatterService: ExcelDateFormatterService) {
        this.meta.addTags([
            { name: 'description', content: 'CV generator tool with BI features' },
            { name: 'author', content: 'Georgi Marinov' },
            { name: 'category', content: 'Personal' },
            { name: 'project type', content: 'Cloud' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
        ]);
    }

    ngOnInit() {
        this.getUi();
        this.getEntities();

        this.getCv();
        this.getProjects();
    }

    ngAfterViewInit() {
        this.chartService.initColors();
    }

    public drawChart(chartType: string, chartConfiguration: any) {
        if (!this.chartLoaded[chartType]) {
            const ctx = this.loadChartContext(this.chartName(chartType));
            if (ctx != null) {
                this.chartService.createChart(ctx, chartConfiguration);
                this.chartLoaded[chartType] = true;
            }
        }
    }

    private getCv(): void {
        this.dataService.getCv().subscribe((cv) => {
            this.cv = cv;
            this.filteredAccomplishments = cv.Courses;
            this.filteredPublications = cv.Publications;
            this.calcCountCache();
        });
    }

    private getProjects(): void {
        this.dataService.getProjects().subscribe((projects) => {
            this.projects = projects;
            this.filteredProjects = projects;
            this.calcCountCache();
        });
    }

    private getEntities(): void {
        this.dataService.getEntities().subscribe((entities) => {
            this.adjustEntities(entities);
            this.entities = entities;
        });
    }

    private getUi(): void {
        this.dataService.getUi().subscribe((ui) => {
            this.ui = ui;
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

                // and rename others
                if (this.dataEncrypted && this.uiDefined() && ['Country'].includes(key)) {
                    entity.section = this.ui['By'].text + ' ' + 'Market';
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

    public getProjectProjectImageUri(imageName: string) {
        return this.getSafeUri(this.dataService.getProjectProjectImageUri(imageName));
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
        return typeof this.ui !== 'undefined';
    }

    entitiesDefined(): boolean {
        return typeof this.entities !== 'undefined';
    }

    cvDefined(): boolean {
        return typeof this.cv !== 'undefined';
    }

    projectsDefined(): boolean {
        return typeof this.projects !== 'undefined';
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

    private calcFrequencies(collection: any, propertyName: string) {
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

        const retVal = this.calcFiltered(<Array<any>>this.projects);

        return retVal;
    }

    private calcFilteredAccomplishments() {
        if (typeof this.cv === 'undefined') { return []; }
        if (typeof this.cv.Courses === 'undefined') { return []; }

        const retVal = this.calcFiltered(<Array<any>>this.cv.Courses);

        return retVal;
    }

    private calcFilteredPublications() {
        if (typeof this.cv === 'undefined') { return []; }
        if (typeof this.cv.Publications === 'undefined') { return []; }

        const retVal = this.calcFiltered(<Array<any>>this.cv.Publications);

        return retVal;
    }

    private calcFiltered(array: Array<any>) {
        let searchTokenLower = this.searchToken.toLocaleLowerCase().trim();

        // preprocess request exclusion example
        const exclude = searchTokenLower[0] === '-';
        if (exclude) {
            searchTokenLower = searchTokenLower.substr(1).trim();
        }
        const searcher = exclude ? _ => !_.includes(searchTokenLower) : _ => _.includes(searchTokenLower);
        const reducer = exclude ? (l, r) => l && r : (l, r) => l || r;

        return (array)
            .filter(_ => Object.keys(_)
                .map(k => searcher((_[k] || '')
                    .toString()
                    .toLocaleLowerCase()))
                .reduce(reducer));
    }

    saveToggle(event) {
        this.setToggle(event.currentTarget.attributes.id.nodeValue);
    }
    restoreToggle(document, typeName, contentName?) {
        if (contentName === undefined) { contentName = this.entities[typeName].content; }

        const toggle = this.getToggle(typeName)['content-class'];
        document.getElementById(contentName).className = toggle;
        if (toggle === 'collapse') {
            document.getElementById(typeName).className = 'collapsed';
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

    public replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
    private toTitleCase(str) { return StringExService.toTitleCase(str); }
}

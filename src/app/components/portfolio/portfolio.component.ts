import { Meta } from '@angular/platform-browser';
import { Component, Inject, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { GanttChartService } from '../../services/gantt-chart/gantt-chart.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { StringExService } from '../../services/string-ex/string-ex.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit, AfterViewChecked {
    private readonly componentName = '';

    readonly menuDivider = '|';
    readonly frequenciesDivider = '•';

    private cv: any;
    private projects: any;
    private ganttChart: any;
    private entities: any;
    private ui: any;

    private chartLoaded = {};

    private countCache = {};
    private frequenciesCache = {};
    private filteredProjects = [];
    private filteredAccomplishments = [];
    private filteredPublications = [];

    private tagCloudDisplayMode = Object.freeze({ 'tagCloud': 1, 'chart': 2, 'both': 3 });

    private _tagCloud = this.tagCloudDisplayMode.both;
    get tagCloud() {
        return this._tagCloud;
    }
    @Input() set tagCloud(value) {
        const refreshNeeded = value === this.tagCloudDisplayMode.tagCloud;

        this._tagCloud = value;

        if (refreshNeeded) {
            this.refreshCharts();
        }
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
    }

    constructor(
        private meta: Meta,
        private dataService: DataService,
        private chartService: ChartService,
        private ganttChartService: GanttChartService,
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
        this.getGanttChartReversed();
    }

    ngAfterViewChecked() {
        this.drawCharts();
    }

    private drawCharts() {
        if (typeof document === 'undefined' || document == null) { return; }

        this.chartService.initColors();

        if (typeof this.cv !== 'undefined' && this.cv != null) {
            {
                const chartType = 'Language';
                const data = this.cv.Languages;
                if (data != null) {
                    this.drawChart(chartType, this.chartService.addLanguageChart(data));
                }
            }

            for (const chartType of Object.keys(this.entities)) {
                const data = this.getFrequenciesCache(chartType);
                if (data != null) {
                    this.drawChart(chartType, this.chartService.addChart(data));
                }
            }
        }

        {
            const chartType = 'Project Gantt';
            const data = this.ganttChart;
            const filteredProjects = this.filteredProjects;
            if (data != null) {
                this.drawChart(chartType, this.ganttChartService.addChart(data, filteredProjects));
            }
        }
    }

    private drawChart(chartType: string, chartConfiguration: any) {
        if (!this.chartLoaded[chartType]) {
            const ctx = this.loadChartContext(chartType + ' chart');
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

    private getGanttChartReversed(): void {
        this.dataService.getGanttChart().subscribe((ganttChart) => {
            this.ganttChart = ganttChart.reverse();
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

    private adjustEntities(entities: any) {
        for (const entity in entities) {
            if (entities.hasOwnProperty(entity)) {
                const o = entities[entity];

                o.section = o.node;
                o.section = this.toTitleCase(o.section);

                // adjust some words' case
                for (const section of ['IDEs and Tools']) {
                    if (entity === section) {
                        o.section = o.node;
                    }
                }

                // prefix some with 'By'
                for (const section of ['Client', 'Industry', 'Project type', 'System type']) {
                    if (entity === section) {
                        o.section = 'By ' + o.section;
                    }
                }

                // pluralise others
                for (const section of ['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
                    'Role', 'Resopnsibilities', 'Team size', 'Position']) {
                    if (entity === section) {
                        if (o.section.substr(o.section.length - 1) !== 's') {
                            o.section += 's';
                        }
                    }
                }

                // calc chart name
                o.chart = o.node + ' chart';

                // calc content name
                o.content = o.node + ' content';
            }
        }
    }

    private getProjectProjectImageUri(imageName: string) {
        return this.dataService.getProjectProjectImageUri(imageName);
    }

    private getProjectLogoUri(imageName: string) {
        return this.dataService.getProjectLogoUri(imageName);
    }

    getAccomplishmentCertificateImageUri(imageName: string) {
        return this.dataService.getAccomplishmentCertificateImageUri(imageName);
    }

    getAccomplishmentLogoImageUri(imageName: string) {
        return this.dataService.getAccomplishmentLogoImageUri(imageName);
    }

    getAccomplishmentPublicationLogoImageUri(imageName: string) {
        return this.dataService.getAccomplishmentPublicationLogoImageUri(imageName);
    }

    getBackgroundLogoImageUri(imageName: string) {
        return this.dataService.getBackgroundLogoImageUri(imageName);
    }

    private isEmptyProjectProjectImage(imageName: string): boolean {
        return imageName === 'Empty.png';
    }

    private getAssetUri(imageName: string) {
        return this.dataService.getAssetUri(imageName);
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

    schoolDetail(school) {
        return [
            school['Degree'],
            school['Field'],
            school['Grade'],
            school['Description']]
            .filter(_ => _ !== undefined && _ !== '')
            .join(', ');
    }

    private count(collection: any, propertyName: string, splitter: string = ', '): number {
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
            'Position']) {
            this.calcFrequencies(this.filteredProjects, propertyName);
        }

        this.calcFrequencies(this.filteredAccomplishments, 'Name');
        this.calcFrequencies(this.filteredPublications, 'Title');

        // calc sections start project and count cache
        let i = 0;
        let lastPeriod = '';
        for (const project of this.filteredProjects) {
            const period = project['Period'];
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

    private getFrequenciesCache(propertyName: string): any[] {
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

    private getJsDateValueFromExcel(excelDate: any) {
        let date = new Date(2000, 0, 1);

        if (typeof excelDate === 'string') {
            const timestamp = Date.parse(excelDate);

            if (!isNaN(timestamp)) {
                date = new Date(timestamp);
            }
        } else if (typeof excelDate === 'number') {
            date = new Date(this.excelDateFormatterService.getJsDateValueFromExcel(excelDate));
        }

        return date;
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
        const searchTokenLower = this.searchToken.toLocaleLowerCase().trim();

        return (array)
            .filter(_ => Object.keys(_)
                .map(k => (_[k] || '')
                    .toString()
                    .toLocaleLowerCase()
                    .indexOf(searchTokenLower) !== -1)
                .reduce((l, r) => l || r));
    }

    private nonBreaking(sectionName: string) {
        return sectionName ? this.replaceAll(sectionName, ' ', String.fromCharCode(160)) : ''; // &nbsp;
    }

    private replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
    private toTitleCase(str) { return StringExService.toTitleCase(str); }
}

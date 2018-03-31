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
    private readonly componentName = 'portfolio';

    private cv: any;
    private projects: any;
    private ganttChart: any;
    private entities: any;
    private ui: any;

    private chartLoaded = {};

    private countCache = {};
    private frequenciesCache = {};
    private filteredProjects = [];

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
        this.calcCountCache();
    }

    constructor(
        private dataService: DataService,
        private chartService: ChartService,
        private ganttChartService: GanttChartService,
        private tagCloudProcessorService: TagCloudProcessorService,
        private excelDateFormatterService: ExcelDateFormatterService) {
    }

    ngOnInit() {
        const ui = this.getUi();
        const entities = this.getEntities();

        const cv = this.getCv();
        const projects = this.getProjects();
        const ganttChart = this.getGanttChartReversed();
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

                o.section = this.replaceAll(o.node, ' ', String.fromCharCode(160)); // &nbsp;
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
            }
        }
    }

    private getProjectProjectImageUri(imageName: string) {
        return this.dataService.getProjectProjectImageUri(imageName);
    }

    private getProjectLogoUri(imageName: string) {
        return this.dataService.getProjectLogoUri(imageName);
    }

    private isEmptyProjectProjectImage(imageName: string): boolean {
        return imageName === 'Empty.png';
    }

    private getAssetUri(imageName: string) {
        return this.dataService.getAssetUri(imageName);
    }

    private cvDefined(): boolean {
        return typeof this.cv !== 'undefined';
    }

    private projectsDefined(): boolean {
        return typeof this.projects !== 'undefined';
    }

    private count(collection: any, propertyName: string, splitter: string = ', '): number {
        const aggregate = this.aggregate(collection, propertyName, splitter);
        const matches = aggregate.match(/\|/g);
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
            .join(' | ');

        return aggregation;
    }

    private calcCountCache() {
        this.countCache = {};

        this.calcFrequencies(this.filteredProjects, 'Client');
        this.calcFrequencies(this.filteredProjects, 'Industry');
        this.calcFrequencies(this.filteredProjects, 'Project type');
        this.calcFrequencies(this.filteredProjects, 'System type');

        this.calcFrequencies(this.filteredProjects, 'Platform');
        this.calcFrequencies(this.filteredProjects, 'Architecture');
        this.calcFrequencies(this.filteredProjects, 'Languages and notations');
        this.calcFrequencies(this.filteredProjects, 'IDEs and Tools');

        this.calcFrequencies(this.filteredProjects, 'Role');
        this.calcFrequencies(this.filteredProjects, 'Responsibilities', ' | ');
        this.calcFrequencies(this.filteredProjects, 'Team size');
        this.calcFrequencies(this.filteredProjects, 'Position');

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

    private calcFrequencies(collection: any, propertyName: string, splitter: string = ', ') {
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

        if (this.entities[propertyName] == null) {
            return;
        }

        const parentEntity = this.entities[propertyName].parent;

        this.updateCount(parentEntity, count);
    }

    private getJsDateValueFromExcel(excelDate: any) {
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

        const searchTokenLower = this.searchToken.toLocaleLowerCase().trim();

        const retVal = (<Array<any>>this.projects)
            .filter(p => Object.keys(p)
                .map(k => p[k]
                    .toString()
                    .toLocaleLowerCase()
                    .indexOf(searchTokenLower) !== -1)
                .reduce((l, r) => l || r)
            );

        return retVal;
    }

    private replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
    private toTitleCase(str) { return StringExService.toTitleCase(str); }
}

import { Component, Inject, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../../services/data.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit, AfterViewChecked {
    public cv: any;
    public projects: any;
    public componentName = 'portfolio';
    public ctx: any;

    private languageChartLoaded = false;

    entities: any = {
        'Project Summary': '',

        'Areas of Expertise': 'Project Summary',
        'Client': 'Areas of Expertise',
        'Industry': 'Areas of Expertise',
        'Project type': 'Areas of Expertise',
        'System type': 'Areas of Expertise',

        'Skills': 'Project Summary',
        'Platform': 'Skills',
        'Architecture': 'Skills',
        'Language': 'Skills',
        'IDEs and Tools': 'Skills',

        'Job Functions': 'Project Summary',
        'Responsibilities': 'Job Functions',
        'Role': 'Job Functions',
        'Team size': 'Job Functions',
        'Position': 'Job Functions'
    };
    countCache = {};
    frequenciesCache = {};
    filteredProjects = [];

    // @Input() searchToken: string = "";
    private _searchToken = '';
    get searchToken(): string {
        return this._searchToken;
    }
    @Input() set searchToken(value: string) {
        this._searchToken = value;
        this.filteredProjects = this.calcFilteredProjects();
        this.calcCountCache();
    }

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private dataService: DataService) {
        // console.log('In constructor()...');
    }

    ngOnInit() {
        // console.log('In ngOnInit()...');

        const cv = this.getCv();
        const projects = this.getProjects();
    }

    ngAfterViewChecked() {
        // console.log('In ngAfterViewChecked()...');

        if (typeof document === 'undefined' || document == null) { return; }

        const HTMLElement = <HTMLElement>document.getElementById('Languages');
        if (typeof HTMLElement === 'undefined' || HTMLElement == null) { return; }

        if (!this.languageChartLoaded) {
            this.addLanguageChart();
            this.languageChartLoaded = true;
        }
    }

    public getCv(): void {
        this.dataService.getCv().subscribe((cv) => {
            this.cv = cv;
        });
    }

    public getProjects(): void {
        this.dataService.getProjects().subscribe((projects) => {
            this.projects = projects;
            this.filteredProjects = projects;
            this.calcCountCache();
        });
    }

    getProjectProjectImageUri(imageName: string) {
        return this.dataService.getProjectProjectImageUri(imageName);
    }

    getProjectLogoUri(imageName: string) {
        return this.dataService.getProjectLogoUri(imageName);
    }

    isEmptyProjectProjectImage(imageName: string): boolean {
        return imageName === 'Empty.png';
    }

    getAssetUri(imageName: string) {
        return this.dataService.getAssetUri(imageName);
    }

    cvDefined(): boolean {
        return typeof this.cv !== 'undefined';
    }

    projectsDefined(): boolean {
        return typeof this.projects !== 'undefined';
    }

    count(collection: any, propertyName: string, splitter: string = ', '): number {
        const aggregate = this.aggregate(collection, propertyName, splitter);
        const matches = aggregate.match(/\|/g);
        return matches ? matches.length + 1 : aggregate.length > 0 ? 1 : 0;
    }

    aggregate(collection: any, propertyName: string, splitter: string = ', '): string {
        if ((typeof collection === 'undefined')) {
            return '';
        }

        let aggregation = '';

        for (let i = 0; i < collection.length; i++) {
            let propertyValue = collection[i][propertyName];

            if (['From', 'To'].indexOf(propertyName) > -1) {
                propertyValue = this.formatDate(propertyValue);
            }

            aggregation = aggregation.concat(propertyValue, splitter);
        }
        // aggregation = aggregation.substring(0, aggregation.length - splitter.length);

        const arr = aggregation.split(splitter);

        aggregation = arr
            .filter(function (item, pos) {
                return item !== '' && arr.indexOf(item) === pos;
            })
            .join(' | ');

        return aggregation;
    }

    calcCountCache() {
        this.countCache = {};

        this.calcFrequencies(this.filteredProjects, 'Client');
        this.calcFrequencies(this.filteredProjects, 'Industry');
        this.calcFrequencies(this.filteredProjects, 'Project type');
        this.calcFrequencies(this.filteredProjects, 'System type');

        this.calcFrequencies(this.filteredProjects, 'Platform');
        this.calcFrequencies(this.filteredProjects, 'Architecture');
        this.calcFrequencies(this.filteredProjects, 'Language');
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
    }
    getFrequenciesCache(propertyName: string): any[] {
        return this.frequenciesCache[propertyName];
    }
    calcFrequencies(collection: any, propertyName: string, splitter: string = ', ') {
        this.countCache[propertyName] = 0;

        if ((typeof collection === 'undefined')) {
            return;
        }

        let frequencies = '';

        for (let i = 0; i < collection.length; i++) {
            let propertyValue = collection[i][propertyName];

            if (['From', 'To'].indexOf(propertyName) > -1) {
                propertyValue = this.formatDate(propertyValue);
            }

            frequencies = frequencies.concat(propertyValue, splitter);
        }

        let data = frequencies.split(splitter);
        data = data.filter(_ => _ !== '');

        const wordCount: any = {};
        const length = data.length;
        let min = 0;
        let max = 0;
        for (let i = 0; i < length; i++) {
            const value = wordCount[data[i]];
            if (value < min) { min = value; }
            if (value > max) { max = value; }
            const newValue = (typeof value === 'undefined') ? 1 : value + 1;
            wordCount[data[i]] = newValue;
        }
        for (const i in wordCount) {
            if (wordCount.hasOwnProperty(i)) {
                wordCount[i] = (max - wordCount[i] + 1) / (max - min) * 50;
            }
        }

        const entries = Object.entries(wordCount);

        this.updateCount(propertyName, entries.length);

        this.frequenciesCache[propertyName] = entries;
    }

    updateCount(propertyName: string, count: number) {
        if (propertyName === '' || typeof propertyName === 'undefined') {
            return;
        }

        if (typeof this.countCache[propertyName] !== 'number') {
            this.countCache[propertyName] = 0;
        }

        this.countCache[propertyName] += count;

        const parentEntity = this.entities[propertyName];

        this.updateCount(parentEntity, count);
    }

    formatDate(excelDate: any) {
        const date = this.getJsDateFromExcel(excelDate);
        let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        formattedDate = formattedDate.replace(',', '');
        return formattedDate;
    }

    getJsDateFromExcel(excelDate: any) {
        return new Date(this.getJsDateValueFromExcel(excelDate));
    }

    getJsDateValueFromExcel(excelDate: any) {
        return (excelDate - (25567 + 2)) * 86400 * 1000;
    }


    addLanguageChart() {
        // console.log('In addLanguageChart()...');

        this.loadLanguagesChartContext();

        const data = {
            datasets: [{
                data: this.cv.Languages.map((_: any) => _.Share),
                backgroundColor: [
                    '#00cec940',
                    '#ff767540',
                    '#55efc440',
                    '#e8439340',
                    '#0984e340',
                    '#fab1a040',
                    '#a29bfe40',
                    '#fdcb6e40'
                ],
                hoverBackgroundColor: [
                    '#00cec980',
                    '#ff767580',
                    '#55efc480',
                    '#e8439380',
                    '#0984e380',
                    '#fab1a080',
                    '#a29bfe80',
                    '#fdcb6e80'
                ],
                borderColor: this.cv.Languages.map((_: any) => '#E8E8E8'),
                hoverBorderColor: this.cv.Languages.map((_: any) => '#E8E8E8'),
                borderWidth: 3
            }],
            labels: this.cv.Languages.map((_: any) => _.Language + ': ' + _.Level)
        };

        const chartConfiguration: Chart.ChartConfiguration = {
            type: 'pie',
            options: {
                legend: {
                    labels: {
                        // fontFamily: 'Century Gothic',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontColor: '#101010',
                        fontSize: 14
                    },
                    display: true,
                    position: 'right'
                },
                tooltips: {
                    mode: 'nearest',
                    position: 'average',
                    xPadding: 6,
                    yPadding: 6,
                    bodyFontSize: 14,
                    bodySpacing: 2,
                    caretSize: 10,
                    displayColors: false,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    bodyFontColor: '#fff',
                    callbacks: {
                        label: function (tooltipItem, actualData) {
                            const value = actualData.datasets[0].data[tooltipItem.index].toString().trim();
                            return (actualData.labels[tooltipItem.index] + ' - ' + value + '%');
                        },
                        labelTextColor: function (tooltipItem, chart) {
                            return '#000000';
                        }
                    }
                },
                responsive: false,
                layout: {
                    padding: 10
                }
            }
        };
        chartConfiguration.data = data;

        const myChart = new Chart(this.ctx, chartConfiguration);
    }

    loadLanguagesChartContext() {
        // console.log('In loadLanguagesChartContext()...');

        if (typeof document === 'undefined' || document == null) { return; }

        const canvas = <HTMLCanvasElement>document.getElementById('myChart');
        if (typeof canvas === 'undefined' || canvas == null) { return; }

        const ctx = canvas.getContext('2d');
        if (typeof ctx === 'undefined' || ctx == null) { return; }

        this.ctx = ctx;
    }

    public calcFilteredProjects() {
        if (typeof this.projects === 'undefined') { return []; }

        const searchTokenLower = this.searchToken.toLocaleLowerCase();

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
}

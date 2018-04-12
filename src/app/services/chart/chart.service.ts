import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { HSLA } from './hsla';

@Injectable()
export class ChartService {
    private readonly backgroundColorRange: HSLA = {
        h: { from: 0, to: 360, speed: 4, pace: 15.25 },
        s: { from: 100, to: 33, speed: 3, pace: 11.33 },
        l: { from: 80, to: 33, speed: 5, pace: 19.2 },
        a: { from: 100, to: 100, speed: 1, pace: 1 }
    };

    private readonly alpha = { normal: 40, hover: 75 };

    private backgroundColor: HSLA = new HSLA();
    private hoverBackgroundColor: HSLA = new HSLA();

    private readonly hoverBackgroundColorHue = 0;

    private chartInstancesCache = {};

    constructor() {
        for (const component in this.backgroundColorRange) {
            if (this.backgroundColorRange.hasOwnProperty(component)) {
                const o = this.backgroundColorRange[component];

                o.range = o.to - o.from;

                const fullRange = o.range * o.speed;
                const fullStep = o.range / o.pace;
                const shards = fullRange / fullStep;
                o.step = o.range / shards;

                o.direction = 1;
            }
        }
    }

    initColors() {
        this.initColor(this.backgroundColor);
        this.initColor(this.hoverBackgroundColor);
    }

    private initColor(color) {
        for (const component in this.backgroundColorRange) {
            if (this.backgroundColorRange.hasOwnProperty(component)) {
                color[component] = this.backgroundColorRange[component].from;
            }
        }
    }

    createChart(ctx, chartConfiguration) {
        if (this.chartInstancesCache[ctx.canvas.id] != null) {
            this.chartInstancesCache[ctx.canvas.id].destroy();
            delete this.chartInstancesCache[ctx.canvas.id];
        }

        const chart = new Chart(ctx, chartConfiguration);
        this.chartInstancesCache[ctx.canvas.id] = chart;
        return chart;
    }

    addLanguageChart(languages: any) {
        const data = {
            datasets: [{
                data: languages.map((_: any) => _.Share),
                backgroundColor: languages.map((_: any) => this.nextBackgroundColor()),
                hoverBackgroundColor: languages.map((_: any) => this.nextHoverBackgroundColor()),
                borderColor: languages.map((_: any) => '#E8E8E8'),
                hoverBorderColor: languages.map((_: any) => '#E8E8E8'),
                borderWidth: 2
            }],
            labels: languages.map((_: any) => _.Language + ': ' + _.Level + ' (' + _.Share + '%)')
        };

        const chartConfiguration: Chart.ChartConfiguration = {
            type: 'pie',
            options: {
                legend: {
                    labels: {
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
                            return (actualData.labels[tooltipItem.index]);
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

        return chartConfiguration;
    }

    addChart(frequencies: any) {
        const data = {
            datasets: [{
                data: frequencies.map((_: any) => _[1].Count),
                backgroundColor: frequencies.map((_: any) => this.nextBackgroundColor()),
                hoverBackgroundColor: frequencies.map((_: any) => this.nextHoverBackgroundColor()),
                borderColor: '#E8E8E8',
                hoverBorderColor: '#E8E8E8',
                borderWidth: 2
            }],
            labels: frequencies.map((_: any) => this.shorten(_[0]) + ': ' + _[1].Count + ' (' + _[1].Percentage + '%)')
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
                    // position: 'bottom'
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
                            return (actualData.labels[tooltipItem.index]);
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

        return chartConfiguration;
    }

    private nextBackgroundColor() {
        this.nextColor(this.backgroundColor);
        const color = this.backgroundColor;
        color.a = this.alpha.normal;
        return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
    }

    private nextHoverBackgroundColor() {
        this.nextColor(this.hoverBackgroundColor);
        const color = this.hoverBackgroundColor;
        color.a = this.alpha.hover;
        return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
    }

    private nextColor(color) {
        for (const component in color) {
            if (color.hasOwnProperty(component)) {
                color[component] += this.backgroundColorRange[component].speed *
                    this.backgroundColorRange[component].step *
                    this.backgroundColorRange[component].direction;
            }
        }

        this.normalizeColorComponent(color, 's');
        this.normalizeColorComponent(color, 'l');
    }

    private normalizeColorComponent(color, component) {
        if (this.backgroundColorRange[component].direction > 0) {
            const delta = color[component] - this.backgroundColorRange[component].to;
            this.correctColor(component, delta, color);
        } else {
            const delta = this.backgroundColorRange[component].from - color[component];
            this.correctColor(component, delta, color);
        }
    }

    private correctColor(component: any, delta: number, color: any) {
        if (this.backgroundColorRange[component].step * delta >= 0) {
            color[component] = this.backgroundColorRange[component].from + delta * this.backgroundColorRange[component].direction;
            this.backgroundColorRange[component].direction *= -1;
        }
    }

    private shorten(s) {
        const maxlength = 100;

        if (s.length > maxlength) {
            s = s.substring(0, maxlength) + '...';
        }

        return s;
    }
}

import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class ChartService {
    backgroundColorHue = 0;
    hoverBackgroundColorHue = 0;
    colorHueStep = 32;

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
                borderColor: frequencies.map((_: any) => '#E8E8E8'),
                hoverBorderColor: frequencies.map((_: any) => '#E8E8E8'),
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

    nextBackgroundColor() {
        this.backgroundColorHue += this.colorHueStep;
        const color = { h: this.backgroundColorHue, s: 100, l: 50, a: 25 };
        return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
    }

    nextHoverBackgroundColor() {
        this.hoverBackgroundColorHue += this.colorHueStep;
        const color = { h: this.hoverBackgroundColorHue, s: 100, l: 50, a: 50 };
        return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
    }

    shorten(s) {
        const maxlength = 100;

        if (s.length > maxlength) {
            s = s.substring(0, maxlength) + '...';
        }

        return s;
    }
}

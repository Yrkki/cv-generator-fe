import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class ChartService {
    addLanguageChart(languages: any) {
        // console.log('In addLanguageChart()...');

        const data = {
            datasets: [{
                data: languages.map((_: any) => _.Share),
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
                borderColor: languages.map((_: any) => '#E8E8E8'),
                hoverBorderColor: languages.map((_: any) => '#E8E8E8'),
                borderWidth: 3
            }],
            labels: languages.map((_: any) => _.Language + ': ' + _.Level)
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

        return chartConfiguration;
    }
}

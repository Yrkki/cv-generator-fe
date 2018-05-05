import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GanttChartService {

  constructor() { }

  addChart(projects: any, filteredProjects: any) {
    if (!projects) { return null; }

    const data = {
      datasets: [{
        backgroundColor: '#00000000',
        hoverBackgroundColor: '#00000000',
        borderColor: '#00000000',
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        data: projects.map((_: any) => _.From)
      }, {
        backgroundColor: projects.map((_: any) =>
          filteredProjects.filter(__ => __.Id === _.Id).length > 0
            ? _.Color
            : '#00000020'),
        hoverBackgroundColor: projects.map((_: any) => _.Color),
        borderColor: '#E8E8E8',
        hoverBorderColor: '#E8E8E8',
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        data: projects.map((_: any) => _.To - _.From)
      }],
      labels: projects.map((_: any) => _['Project name'])
    };

    const chartConfiguration: Chart.ChartConfiguration = {
      type: 'horizontalBar',
      options: {
        legend: {
          display: false
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
          backgroundColor: 'rgba(255,255,255,0.7)',
          bodyFontColor: '#fff',
          callbacks: {
            title: _ => '',
            label: (tooltipItem, actualData) => {
              const value = actualData.datasets[0].data[tooltipItem.index].toString().trim();
              return (this.splitLine(actualData.labels[tooltipItem.index]));
            },
            labelTextColor: (tooltipItem, chart) => {
              return '#000000';
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtzero: false,
              stepSize: 365.24 / 4,
              min: 34700,
              max: 43831,
              callback: (value, index, values) => {
                if (index % 4 === 0) {
                  const dateValueFromExcel = (value - (25567 + 1)) * 86400 * 1000;
                  const dateFromExcel = new Date(dateValueFromExcel);
                  return dateFromExcel.getFullYear();
                } else {
                  return '';
                }
              },
              fontSize: 14
            },
            gridLines: {
            },
            stacked: true
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 40,
              stepSize: 40,
              mirror: true,
              fontSize: 14
            },
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true,
            barPercentage: 1.2
          }]
        }
      }
    };
    chartConfiguration.data = data;

    return chartConfiguration;
  }

  private splitLine(str: string): string[] {
    const maxLength = 40;

    const lines = [];

    if (str.length > maxLength) {
      const position = maxLength + str.substr(maxLength).indexOf(' ');
      lines.push(str.substr(0, position));
      this.splitLine(str.substr(position + 1)).forEach(_ => lines.push(_));
    } else {
      lines.push(str);
    }

    return lines;
  }
}

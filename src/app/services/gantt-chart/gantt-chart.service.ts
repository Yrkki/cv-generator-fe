import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GanttChartService {

  constructor() { }

  addChart(projects: any) {
    const data = {
      datasets: [{
        backgroundColor: '#00000000',
        hoverBackgroundColor: projects.map((_: any) => '#00000010'),
        borderColor: '#00000000',
        fill: false,
        borderWidth: 0,
        pointRadius: 0,
        data: projects.map((_: any) => _.From)
      }, {
        backgroundColor: projects.map((_: any) => _.Color),
        hoverBackgroundColor: projects.map((_: any) => _.Color),
        borderColor: projects.map((_: any) => '#E8E8E8'),
        hoverBorderColor: projects.map((_: any) => '#E8E8E8'),
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
          enabled: false
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtzero: false,
              stepSize: 365.25,
              min: 34700,
              max: 43831,
              callback: function (value, index, values) {
                const dateValueFromExcel = (value - (25567 + 2)) * 86400 * 1000;
                const dateFromExcel = new Date(dateValueFromExcel);
                return dateFromExcel.getFullYear();
              }
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
              max: 30,
              stepSize: 30,
              mirror: true
            },
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true
          }]
        }
      }
    };
    chartConfiguration.data = data;

    return chartConfiguration;
  }
}

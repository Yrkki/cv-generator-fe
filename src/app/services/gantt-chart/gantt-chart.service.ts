import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GanttChartService {

  constructor() { }

  addChart(projects: any, filteredProjects: any) {
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
          backgroundColor: 'rgba(0,0,0,0.1)',
          bodyFontColor: '#fff',
          callbacks: {
            title: _ => '',
            label: function (tooltipItem, actualData) {
              const value = actualData.datasets[0].data[tooltipItem.index].toString().trim();
              return (actualData.labels[tooltipItem.index]);
            },
            labelTextColor: function (tooltipItem, chart) {
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
              callback: function (value, index, values) {
                if (index % 4 === 0) {
                  const dateValueFromExcel = (value - (25567 + 1)) * 86400 * 1000;
                  const dateFromExcel = new Date(dateValueFromExcel);
                  return dateFromExcel.getFullYear();
                } else {
                  return '';
                }
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

import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GanttChartService {

  constructor() { }

  addChart(frequencies: any) {
    const data = {
      datasets: [{
        data: frequencies.map((_: any) => _[1].Count),
        // backgroundColor: frequencies.map((_: any) => this.nextBackgroundColor()),
        // hoverBackgroundColor: frequencies.map((_: any) => this.nextHoverBackgroundColor()),
        borderColor: frequencies.map((_: any) => '#E8E8E8'),
        hoverBorderColor: frequencies.map((_: any) => '#E8E8E8'),
        borderWidth: 2
      }],
      // labels: frequencies.map((_: any) => this.shorten(_[0]) + ': ' + _[1].Count + ' (' + _[1].Percentage + '%)')
    };

    const chartConfiguration: Chart.ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Scatter Dataset',
            backgroundColor: 'rgba(246,156,85,1)',
            borderColor: 'rgba(246,156,85,1)',
            fill: false,
            borderWidth: 15,
            pointRadius: 0,
            data: [
              {
                x: 0,
                y: 9
              }, {
                x: 3,
                y: 9
              }
            ]
          },
          {
            backgroundColor: 'rgba(208,255,154,1)',
            borderColor: 'rgba(208,255,154,1)',
            fill: false,
            borderWidth: 15,
            pointRadius: 0,
            data: [
              {
                x: 3,
                y: 7
              }, {
                x: 5,
                y: 7
              }
            ]
          },
          {
            label: 'Scatter Dataset',
            backgroundColor: 'rgba(246,156,85,1)',
            borderColor: 'rgba(246,156,85,1)',
            fill: false,
            borderWidth: 15,
            pointRadius: 0,
            data: [
              {
                x: 5,
                y: 5
              }, {
                x: 10,
                y: 5
              }
            ]
          },
          {
            backgroundColor: 'rgba(208,255,154,1)',
            borderColor: 'rgba(208,255,154,1)',
            fill: false,
            borderWidth: 15,
            pointRadius: 0,
            data: [
              {
                x: 10,
                y: 3
              }, {
                x: 13,
                y: 3
              }
            ]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtzero: false,
              stepSize: 1
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: false,
              max: 10
            }
          }]
        }
      }
    };
    // chartConfiguration.data = data;

    return chartConfiguration;
  }
}

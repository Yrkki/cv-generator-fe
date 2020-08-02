import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { HSLA } from './hsla';
import { ColorComponent } from './color-component';
import { Indexable } from '../..//interfaces/indexable';
import { ChartModel } from '../../model/chart/chart.model';

/**
 * A chart diagram service.
 */
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  /** Whether already initiolized once. */
  private initialized = false;

  /** The increment vector. */
  private readonly backgroundColorRange: HSLA = {
    h: { from: 0, to: 360, speed: 4, pace: 15.25 },
    s: { from: 100, to: 33, speed: 3, pace: 11.33 },
    l: { from: 80, to: 33, speed: 5, pace: 19.2 },
    a: { from: 100, to: 100, speed: 1, pace: 1 }
  };

  /** The alphas when shown normally and when hovering. */
  private readonly alpha = { normal: 40, hover: 75 };

  /** A current background color reference. */
  private backgroundColor: HSLA = new HSLA();
  /** A current hover background color reference. */
  private hoverBackgroundColor: HSLA = new HSLA();

  /** Instances tracker. */
  private chartInstancesCache: Indexable<Chart> = {};

  /** A map of charts by chart type that are already loaded. */
  /** Charts map getter. */
  public get chartLoaded() { return this.chartModel.chartLoaded; }
  /** Charts map setter. */
  public set chartLoaded(value) { this.chartModel.chartLoaded = value; }

  /**
   * Constructs a chart.
   * ~constructor
   *
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    protected chartModel: ChartModel
  ) {
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

  /**
   * Initializes the color scheme.
   */
  initColors() {
    if (!this.initialized) {
      this.initColor(this.backgroundColor);
      this.initColor(this.hoverBackgroundColor);
    }
  }

  /**
   * Initializes a color layer.
   * @param color The color layer to initialize.
   */
  private initColor(color: HSLA) {
    for (const component in this.backgroundColorRange) {
      if (this.backgroundColorRange.hasOwnProperty(component)) {
        color[component] = this.backgroundColorRange[component].from;
      }
    }
  }

  /** Draws a chart.
   * @param chartType The type of the chart.
   * @param chartConfiguration The chart configuration.
   */
  public drawChart(chartType: string, chartConfiguration: any) {
    // console.log('Debug: drawChart: chartType:', chartType);
    if (!this.chartLoaded[chartType]) {
      const ctx = this.loadChartContext(this.chartName(chartType));
      // console.log('Debug: drawChart: ctx:', ctx);
      if (ctx != null && ctx !== undefined) {
        // console.log('Debug: drawChart: chartConfiguration:', chartConfiguration);
        this.createChart(ctx, chartConfiguration);
        this.chartLoaded[chartType] = true;
      }
    }
  }

  /**
   * Finds a chart graphics context for a specified id.
   * @param canvasId The chart id to look up context for.
   *
   * @returns The chart graphics context if found.
   */
  private loadChartContext(canvasId: string): CanvasRenderingContext2D | undefined {
    if (typeof document === 'undefined' || document == null) { return undefined; }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    // console.log('Debug: loadChartContext: canvas: ', canvas);
    if (typeof canvas === 'undefined' || canvas == null) { return undefined; }

    const ctx = canvas.getContext('2d');
    // console.log('Debug: loadChartContext: ctx: ', ctx);
    if (typeof ctx === 'undefined' || ctx == null) { return undefined; }

    return ctx;
  }

  /**
   * Names a chart element.
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  public chartName(key: string): string {
    return key + ' chart';
  }

  /** Invokes redrawing the charts. */
  public refreshCharts() {
    this.chartLoaded = {};
  }

  /**
   * Creates a chart.
   * @param ctx The context to draw the chart in.
   * @param chartConfiguration The chart configuration.
   *
   * @returns A Chart object.
   */
  private createChart(ctx: CanvasRenderingContext2D, chartConfiguration: Chart.ChartConfiguration): Chart {
    if (this.chartInstancesCache[ctx.canvas.id] != null) {
      // console.log('Debug: ChartService: createChart: deleting: ctx.canvas.id: ', ctx.canvas.id);
      this.chartInstancesCache[ctx.canvas.id].destroy();
      delete this.chartInstancesCache[ctx.canvas.id];
    }

    // console.log('Debug: ChartService: createChart: instantiating: chartConfiguration: ', chartConfiguration);
    const chart = new Chart(ctx, chartConfiguration);
    this.chartInstancesCache[ctx.canvas.id] = chart;
    return chart;
  }

  /**
   * Adds a language chart.
   * @param languages The array of languages to show.
   *
   * @returns A ChartConfiguration object.
   */
  addLanguageChart(languages: any[]): Chart.ChartConfiguration {
    if (!languages) { return {}; }

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
            // fontFamily: 'sans-serif',
            // fontColor: '#101010',
            // fontSize: 10
            // fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            // fontColor: '#101010',
            // fontSize: 12
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
          backgroundColor: 'rgba(255,255,255,0.7)',
          bodyFontColor: '#fff',
          callbacks: {
            label: (tooltipItem, actualData) => {
              if (!tooltipItem.index) { return ''; }
              return (actualData.labels?.[tooltipItem.index].toString() || '');
            },
            labelTextColor: (tooltipItem, chart) => {
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

  /**
   * Adds a chart of frequency objects.
   * @param frequencies Array of frequency data items for the chart.
   * @param items The background items shown. Used in class descendants.
   *
   * @returns A ChartConfiguration object.
   */
  addChart(frequencies: any[], items?: any): Chart.ChartConfiguration {
    if (!frequencies) {
      // console.log('Debug: ChartService: addChart: no frequencies.');
      return {};
    }
    // console.log('Debug: ChartService: addChart: frequencies', frequencies);

    const data = {
      datasets: [{
        data: frequencies.map((_: any) => _[1].Count),
        backgroundColor: frequencies.map((_: any) => this.nextBackgroundColor()),
        hoverBackgroundColor: frequencies.map((_: any) => this.nextHoverBackgroundColor()),
        borderColor: '#E8E8E8',
        hoverBorderColor: '#E8E8E8',
        borderWidth: 2
      }],
      labels: frequencies.map((_: any) => _[1].ShortLabel)
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
          position: 'left'
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
            label: (tooltipItem, actualData) => {
              if (!tooltipItem.index) { return ''; }
              return ((frequencies.map((_: any) => _[1].Label)[tooltipItem.index] as string).split('\n'));
            },
            labelTextColor: (tooltipItem, chart) => {
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

  /**
   * Increments a background color of a scheme.
   *
   * @returns A scss hsla color style.
   */
  private nextBackgroundColor(): string {
    this.nextColor(this.backgroundColor);
    const color = this.backgroundColor;
    color.a = this.alpha.normal;
    return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
  }

  /**
   * Increments a hover background color of a scheme.
   *
   * @returns A scss hsla color style.
   */
  private nextHoverBackgroundColor(): string {
    this.nextColor(this.hoverBackgroundColor);
    const color = this.hoverBackgroundColor;
    color.a = this.alpha.hover;
    return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
  }

  /**
   * Increments a color of a scheme.
   * @param color The color to change.
   */
  private nextColor(color: HSLA) {
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

  /**
   * Normalizes a color component.
   * @param color The color to change.
   * @param component The hsla component to change.
   */
  private normalizeColorComponent(color: HSLA, component: ColorComponent) {
    if (this.backgroundColorRange[component].direction > 0) {
      const delta = color[component] - this.backgroundColorRange[component].to;
      this.correctColor(component, delta, color);
    } else {
      const delta = this.backgroundColorRange[component].from - color[component];
      this.correctColor(component, delta, color);
    }
  }

  /**
   * Incrementally changes a color.
   * @param component The hsla component to change.
   * @param delta The amount to add.
   * @param color The color to change.
   */
  private correctColor(component: ColorComponent, delta: number, color: HSLA) {
    if (this.backgroundColorRange[component].step * delta >= 0) {
      color[component] = this.backgroundColorRange[component].from + delta * this.backgroundColorRange[component].direction;
      this.backgroundColorRange[component].direction *= -1;
    }
  }

  /**
   * Resize chart
   * @param id The chart id.
   */
  public resize(canvas: any) {
    // const instance = Chart.instances.find(_ => _.chart.canvas.id === canvas.id);
    // if (instance) {
    //     instance.resize();
    // }
  }
}

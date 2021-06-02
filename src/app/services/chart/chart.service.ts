/* tslint:disable: no-non-null-assertion */
import { Injectable } from '@angular/core';
import {
  Chart, ChartConfiguration, TooltipOptions, PieController, BarController, ArcElement, BarElement,
  LinearScale, CategoryScale, Legend, Tooltip, ChartType
} from 'chart.js';
import { DeepPartial } from 'chart.js/types/utils';
import { Indexable } from '../../interfaces/indexable';
import { ChartColorService } from '../../services/chart-color/chart-color.service';
import { ChartModel } from '../../model/chart/chart.model';

/**
 * A chart diagram service.
 */
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  /** Instances tracker. */
  private chartInstancesCache: Indexable<Chart> = {};

  /**
   * Constructs a chart.
   * ~constructor
   *
   * @param chartColorService The chart color service injected dependency.
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    protected readonly chartColorService: ChartColorService,
    public readonly chartModel: ChartModel,
  ) {
    Chart.register(PieController, BarController, ArcElement, BarElement, LinearScale, CategoryScale, Legend, Tooltip);
  }

  /** Initializes the color scheme delegate. */
  public initColors() { this.chartColorService.initColors(); }

  /** Draws a chart.
   *
   * @param chartType The type of the chart.
   * @param chartConfiguration The chart configuration.
   */
  public drawChart(chartType: string, chartConfiguration: any) {
    // console.log('Debug: drawChart: chartType:', chartType);
    if (!this.chartModel.chartLoaded[chartType]) {
      const ctx = this.loadChartContext(this.chartName(chartType));
      // console.log('Debug: drawChart: ctx:', ctx);
      if (ctx != null && typeof ctx !== 'undefined') {
        // console.log('Debug: drawChart: chartConfiguration:', chartConfiguration);
        this.createChart(ctx, chartConfiguration);
        this.chartModel.chartLoaded[chartType] = true;
      }
    }
  }

  /**
   * Finds a chart graphics context for a specified id.
   *
   * @param canvasId The chart id to look up context for.
   *
   * @returns The chart graphics context if found.
   */
  // eslint-disable-next-line complexity
  private loadChartContext(canvasId: string): CanvasRenderingContext2D | undefined {
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
   *
   * @param key The type of chart.
   *
   * @returns The chart element name.
   */
  public chartName(key: string): string {
    return key + ' chart';
  }

  /** Invokes redrawing the charts. */
  public refreshCharts() {
    this.chartModel.chartLoaded = {};
  }

  /**
   * Creates a chart.
   *
   * @param ctx The context to draw the chart in.
   * @param chartConfiguration The chart configuration.
   *
   * @returns A Chart object.
   */
  private createChart(ctx: CanvasRenderingContext2D, chartConfiguration: ChartConfiguration): Chart {
    try {
      if (this.chartInstancesCache[ctx.canvas.id] != null) {
        // console.log('Debug: ChartService: createChart: deleting: ctx.canvas.id: ', ctx.canvas.id);
        this.cleanUpChart(this.chartInstancesCache[ctx.canvas.id]);
        delete this.chartInstancesCache[ctx.canvas.id];
      }

      // console.log('Debug: ChartService: createChart: instantiating: chartConfiguration: ', chartConfiguration);
      const chart = new Chart(ctx, chartConfiguration);
      this.chartInstancesCache[ctx.canvas.id] = chart;
      return chart;
    } catch (err) { return this.chartInstancesCache[ctx.canvas.id]; }
  }

  /**
   * Cleans up a chart.
   *
   * @param chart The chart to clean up.
   */
  private cleanUpChart(chart: Chart) {
    if (chart != null) {
      chart.destroy();
      // delete chart;
    }
  }

  /**
   * Adds a chart of frequency objects.
   *
   * @param frequencies Array of frequency data items for the chart.
   * @param responsive Whether the chart is responsive/resizeable.
   *
   * @returns A ChartConfiguration object.
   */
  // tslint:disable-next-line: variable-name
  public addChart(frequencies: any[], responsive = false): DeepPartial<ChartConfiguration> {
    if (!frequencies) { return {}; }

    const chartConfiguration = this.chartConfiguration;
    chartConfiguration.options!.plugins!.tooltip = this.tooltip<'pie'>(frequencies);

    chartConfiguration.data = this.datasetsSettings(frequencies);
    chartConfiguration.data.datasets?.forEach((ds) => ds.data = frequencies.map((_: any) => _[1].Count));
    chartConfiguration.data.labels = frequencies.map((_: any) => _[1].ShortLabel);

    chartConfiguration.options!.responsive = responsive;
    if (responsive && chartConfiguration.data.labels.length > 100) {
      chartConfiguration.options!.plugins!.legend!.position = 'chartArea';
    }

    return chartConfiguration;
  }

  /**
   * Adds a language chart.
   *
   * @param languages The array of languages to show.
   * @param responsive Whether the chart is responsive/resizeable.
   *
   * @returns A ChartConfiguration object.
   */
  public addLanguageChart(languages: any[], responsive = false): DeepPartial<ChartConfiguration> {
    if (!languages) { return {}; }

    const chartConfiguration = this.chartConfiguration;
    chartConfiguration.options!.plugins!.legend!.position = 'right';

    chartConfiguration.options!.layout!.padding = 0;
    chartConfiguration.options!.responsive = responsive;

    chartConfiguration.options!.plugins!.tooltip!.callbacks!.label = (tooltipItem) => {
      return chartConfiguration.data!.labels?.[tooltipItem.dataIndex] as string;
    };

    chartConfiguration.data = this.datasetsSettings(languages);
    chartConfiguration.data.datasets?.forEach((ds) => ds.data = languages.map((_: any) => _.Share));
    chartConfiguration.data.labels = languages.map((_: any) => _.Language + ': ' + _.Level + ' (' + _.Share + '%)');

    return chartConfiguration;
  }

  /**
   * Adds a chart of frequency objects.
   *
   * @param frequencies Array of frequency data items for the chart.
   *
   * @returns A ChartConfiguration object.
   */
  protected get chartConfiguration(): DeepPartial<ChartConfiguration> {
    const ttype: ChartType = 'pie';
    return {
      type: ttype,
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                // family: 'Century Gothic',
                family: 'Arial, Helvetica, sans-serif',
                size: 14
              }, color: '#101010',
              boxWidth: 14,
              padding: 10
            }, fullSize: true,
            display: true,
            position: 'left'
          }, tooltip: this.tooltip<typeof ttype>()
        }, layout: { padding: 10 },
        devicePixelRatio: globalThis.devicePixelRatio * 2
      }
    };
  }

  /**
   * The tooltip.
   *
   * @returns A tooltip object.
   */
  protected tooltip<TType extends ChartType>(frequencies?: any[]): DeepPartial<DeepPartial<TooltipOptions<TType>>> {
    return {
      mode: 'nearest',
      position: 'average',
      padding: 6,
      bodyFont: { size: 14 },
      bodySpacing: 2,
      caretSize: 10,
      displayColors: false,
      backgroundColor: 'rgba(255,255,255,0.7)',
      bodyColor: '#fff',
      callbacks: {
        // tslint:disable-next-line: variable-name
        label: (tooltipItem) => {
          if (typeof tooltipItem.dataIndex === 'undefined' || typeof frequencies === 'undefined') { return ''; }
          return ((frequencies.map((_: any) => _[1].Label)[tooltipItem.dataIndex] as string).split('\n'));
        },
        // tslint:disable-next-line: variable-name
        labelTextColor: (_tooltipItem) => '#000000'
      }
    };
  }

  /**
   * The background color.
   *
   * @param color The default background color.
   *
   * @returns A background color object.
   */
  protected backgroundColor(color: string = '#00000000') {
    return {
      backgroundColor: color,
      hoverBackgroundColor: color,
    };
  }

  /**
   * The border color.
   *
   * @param color The default border color.
   *
   * @returns A border color object.
   */
  protected borderColor(color: string = '#E8E8E8') {
    return {
      borderColor: color,
      hoverBorderColor: color,
    };
  }

  /**
   * The datasets.
   *
   * @param items The items to process.
   *
   * @returns A datasets object.
   */
  private datasetsSettings(items: any[]) {
    return {
      datasets: [{
        backgroundColor: items.map((_: any) => this.chartColorService.nextBackgroundColor()),
        hoverBackgroundColor: items.map((_: any) => this.chartColorService.nextHoverBackgroundColor()),
        ...this.borderColor(),
        borderWidth: 2
      }]
    };
  }

  /**
   * Resize chart
   *
   * @param canvas The chart canvas.
   */
  // tslint:disable-next-line: variable-name
  public resize(_canvas: any) { }
}

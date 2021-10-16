// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Injectable } from '@angular/core';
import { HSLA } from './hsla';
import { ColorComponent } from './color-component';
import { ChartModel } from '../../model/chart/chart.model';

/**
 * A chart color service.
 */
@Injectable({
  providedIn: 'root'
})
export class ChartColorService {
  /** Whether already initialized once. */
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

  /**
   * Constructs a chart color service.
   * ~constructor
   *
   * @param chartModel The chart model injected dependency.
   */
  constructor(
    public readonly chartModel: ChartModel
  ) {
    this.Initialize();
  }

  /**
   * Initializes the chart color service.
   */
  private Initialize() {
    for (const component in this.backgroundColorRange) {
      if (Object.prototype.hasOwnProperty.call(this.backgroundColorRange, component)) {
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
  public initColors() {
    if (!this.initialized) {
      this.initColor(this.backgroundColor);
      this.initColor(this.hoverBackgroundColor);
    }
  }

  /**
   * Initializes a color layer.
   *
   * @param color The color layer to initialize.
   */
  private initColor(color: HSLA) {
    for (const component in this.backgroundColorRange) {
      if (Object.prototype.hasOwnProperty.call(this.backgroundColorRange, component)) {
        color[component] = this.backgroundColorRange[component].from;
      }
    }
  }

  /**
   * Increments a background color of a scheme.
   *
   * @returns A scss hsla color style.
   */
  public nextBackgroundColor(): string {
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
  public nextHoverBackgroundColor(): string {
    this.nextColor(this.hoverBackgroundColor);
    const color = this.hoverBackgroundColor;
    color.a = this.alpha.hover;
    return 'hsla(' + [color.h, color.s + '%', color.l + '%', color.a + '%'].join(',') + ')';
  }

  /**
   * Increments a color of a scheme.
   *
   * @param color The color to change.
   */
  private nextColor(color: HSLA) {
    for (const component in color) {
      if (Object.prototype.hasOwnProperty.call(color, component)) {
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
   *
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
   *
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
}

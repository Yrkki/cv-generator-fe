// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
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
//
// Patches dependency lighthouse-badges for custom arguments requirement reasons
// {
//   "name": "lighthouse-badges",
//   "version": "1.1.26",
//   "description": "🚦Generate gh-badges (shields.io) based on Lighthouse performance.",
//   "main": "src/index.js",
//   "repository": {
//     "type": "git",
//     "url": "https://github.com/emazzotta/lighthouse-badges.git"
//   },
//   "author": "Emanuele Mazzotta",
//   "license": "MIT"
// }
//
// Modified line sets marked with:
//     // modified

const { makeBadge } = require('badge-maker');
const path = require('path');
const fs = require('fs');
const ReportGenerator = require('lighthouse/report/generator/report-generator');
const { promisify } = require('util');
const { execFile } = require('child_process'); // modified
const R = require('ramda');
const { statusMessage } = require('./util');
const { getAverageScore, getSquashedScore } = require('./calculations');
const { urlEscaper } = require('./util');
const { percentageToColor } = require('./calculations');

// Buffer size for stdout, must be big enough to handle lighthouse CLI output
const maxBuffer = 1024 * 50000;

const metricsToSvg = async (lighthouseMetrics, badgeStyle, outputPath) => {
  R.keys(lighthouseMetrics).map((lighthouseMetricKey) => {
    const filepath = path.join(outputPath, `${lighthouseMetricKey.replace(/ /g, '_')}.svg`);
    const badgeColor = percentageToColor(lighthouseMetrics[lighthouseMetricKey]);

    const svg = makeBadge({
      label: lighthouseMetricKey,
      message: `${lighthouseMetrics[lighthouseMetricKey]}%`,
      color: badgeColor,
      style: badgeStyle,
    });

    fs.writeFile(filepath, svg, (error) => statusMessage(
      `Saved svg to ${filepath}\n`,
      `Failed to save svg to ${outputPath}`,
      error,
    ));

    return true;
  });
};

const htmlReportsToFile = async (htmlReports, outputPath) => htmlReports.map((htmlReport) => {
  const url = R.head(R.keys(htmlReport));
  if (htmlReport[url]) {
    const filepath = path.join(outputPath, `${urlEscaper(url)}.html`);
    fs.writeFile(filepath, htmlReport[url], (error) => statusMessage(
      `Saved report to ${filepath}\n`,
      `Failed to save report to ${outputPath}`,
      error,
    ));
  }
  return false;
});

const generateArtifacts = async ({ reports, svg, outputPath }) => {
  await Promise.all([
    htmlReportsToFile(reports, outputPath),
    metricsToSvg(svg.results, svg.style, outputPath),
  ]);
};

const processRawLighthouseResult = async (data, url, shouldSaveReport) => {
  const htmlReport = shouldSaveReport ? ReportGenerator.generateReportHtml(data) : false;
  const { categories } = data;
  const scores = R.keys(categories).map((category) => (
    { [`lighthouse ${category.toLowerCase()}`]: categories[category].score * 100 }
  ));
  const lighthouseMetrics = Object.assign({}, ...scores);
  return { metrics: lighthouseMetrics, report: { [url]: htmlReport } };
};

// modified
const calculateLighthouseMetrics = async (url, shouldSaveReport, outputPath, additionalParams = '') => {
  const lighthouseBinary = path.join(__dirname, '../../..', 'node_modules', '.bin', 'lighthouse');
  const outputFilename = `${outputPath}/lighthouse`;
  additionalParams = `--output=json,html --output-path=${outputFilename} ${additionalParams}`;
  const params = `--chrome-flags='--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --no-default-browser-check --no-first-run --disable-default-apps'`;
  await promisify(execFile)(lighthouseBinary, [params, ...additionalParams.split(' '), url], { maxBuffer });
  const outputJsonPath = path.join(lighthouseBinary, '../../..', `${outputFilename}.report.json`);
  const json = fs.readFileSync(outputJsonPath, { encoding: "utf8" });
  return processRawLighthouseResult(JSON.parse(json), url, shouldSaveReport);
};

const processParameters = async (args, func) => {
  const outputPath = args.output_path || process.cwd();

  fs.mkdir(outputPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const additionalParams = process.env.LIGHTHOUSE_BADGES_PARAMS || '';
  const results = await Promise.all(args.urls.map(
    // modified
    (url) => func(url, args.save_report, outputPath, additionalParams),
  ));

  const metrics = R.pluck('metrics', results);
  const reports = R.pluck('report', results);

  const metricsResults = args.single_badge
    ? await getSquashedScore(metrics)
    : await getAverageScore(metrics);

  await generateArtifacts({
    reports,
    svg: { results: metricsResults, style: args.badge_style },
    outputPath,
  });
};

module.exports = {
  metricsToSvg,
  htmlReportsToFile,
  processRawLighthouseResult,
  calculateLighthouseMetrics,
  processParameters,
};

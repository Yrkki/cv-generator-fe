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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ImageDataService } from '../image-data/image-data.service';

/**
 * Data connection service.
 *
 * Retrieves data from a project server.
 */
@Injectable({
    providedIn: 'root'
})
export class DataService {
    /** The data server endpoint. */
    private serverEndpointUri = environment.serverEndpointUri;

    /** The json data path. */
    private json: string = this.urlResolve(this.serverEndpointUri, 'json');
    /** The cv data path. */
    private cv: string = this.urlResolveJson(this.json, 'cv');
    /** The professional experience data path. */
    private professionalExperience: string = this.urlResolveJson(this.json, 'experience');
    /** The education data path. */
    private education: string = this.urlResolveJson(this.json, 'education');
    /** The education data path. */
    private accomplishments: string = this.urlResolveJson(this.json, 'accomplishments');
    /** The publications data path. */
    private publications: string = this.urlResolveJson(this.json, 'publications');
    /** The projects data path. */
    private projects: string = this.urlResolveJson(this.json, 'projects');
    /** The gantt chart data path. */
    private ganttChart: string = this.urlResolveJson(this.json, 'gantt-chart');
    /** The general timeline data path. */
    private generalTimeline: string = this.urlResolveJson(this.json, 'general-timeline');
    /** The entities data path. */
    private entities: string = this.urlResolveJson(this.json, 'entities');
    /** The ui data path. */
    private ui: string = this.urlResolveJson(this.json, 'ui');

    /** The themes data path. */
    private themes: string = this.urlResolve(this.serverEndpointUri, 'themes');
    /** The default theme data path. */
    private themesDefault: string = this.getTheme('default');
    /** The theme data path resolver. */
    private getTheme(themeName: string): string { return this.urlResolve(this.themes, themeName); }

    /** The json-type data path resolver. */
    private urlResolveJson(base: string, url: string): string { return this.urlResolve(base, url + '.json'); }

    /**
     * Constructs the data service.
     * ~constructor
     *
     * @param imageDataService The data service injected dependency.
     * @param httpClient The http client for requests to the server.
     */
    constructor(
        public imageDataService: ImageDataService,
        protected httpClient: HttpClient) {
        // console.log('Debug: DataService: hostname: ' + location.hostname);
        // for (const key in environment) {
        //     if (Object.prototype.hasOwnProperty.call(environment, key)) {
        //         const element = environment[key];
        //         console.log('Debug: DataService: environment.' + key + ': ' + element);
        //     }
        // }
    }

    /**
     * Retrieves a CV.
     *
     * @returns The CV.
     */
    public getCv(): Observable<any> {
        const cv$ = this.httpClient.get<any>(this.cv);

        return cv$;
    }

    /**
     * Retrieves professional experience.
     *
     * @returns The professional experience.
     */
    public getProfessionalExperience(): Observable<any> {
        const experience$ = this.httpClient.get<any>(this.professionalExperience);

        return experience$;
    }

    /**
     * Retrieves education.
     *
     * @returns The education.
     */
    public getEducation(): Observable<any> {
        const education$ = this.httpClient.get<any>(this.education);

        return education$;
    }

    /**
     * Retrieves accomplishments.
     *
     * @returns The accomplishments.
     */
    public getAccomplishments(): Observable<any> {
        const accomplishments$ = this.httpClient.get<any>(this.accomplishments);

        return accomplishments$;
    }

    /**
     * Retrieves publications.
     *
     * @returns The publications.
     */
    public getPublications(): Observable<any> {
        const publications$ = this.httpClient.get<any>(this.publications);

        return publications$;
    }

    /**
     * Retrieves a projects array.
     *
     * @returns The projects array.
     */
    public getProjects(): Observable<any> {
        const projects$ = this.httpClient.get<any>(this.projects);

        return projects$;
    }

    /**
     * Retrieves a gantt chart.
     *
     * @returns The gantt chart.
     */
    public getGanttChart(): Observable<any> {
        const ganttChart$ = this.httpClient.get<any>(this.ganttChart);

        return ganttChart$;
    }

    /**
     * Retrieves a general timeline.
     *
     * @returns The general timeline.
     */
    public getGeneralTimeline(): Observable<any> {
        const generalTimeline$ = this.httpClient.get<any>(this.generalTimeline);

        return generalTimeline$;
    }

    /**
     * Retrieves an entities array.
     *
     * @returns The entities array.
     */
    public getEntities(): Observable<any> {
        const entities$ = this.httpClient.get<any>(this.entities);

        return entities$;
    }

    /**
     * Retrieves a UI.
     *
     * @returns The UI.
     */
    public getUi(): Observable<any> {
        const ui$ = this.httpClient.get<any>(this.ui);

        return ui$;
    }

    /**
     * Retrieves the app version.
     *
     * @returns The app version.
     */
    public getVersion(): Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        httpHeaders.set('Authorization', 'Bearer ' + (environment.CV_GENERATOR_APPVEYOR_TOKEN || ''));
        const options = {
            headers: httpHeaders
        };

        const url = 'https://ci.appveyor.com/api/projects/Yrkki/cv-generator-fe/history?recordsNumber=1';

        const version$ = this.httpClient.get<any>(url, options);

        return version$;
    }

    /**
     * Retrieves a themes holder URI.
     *
     * @returns The themes holder URI.
     */
    private getThemesUri(): string {
        const uri = this.themes;
        return uri;
    }

    /**
     * Retrieves a theme URI.
     *
     * @param themeName The theme name.
     *
     * @returns The theme URI.
     */
    private getThemeUri(themeName: string): string {
        const uri = this.urlResolve(this.themes, themeName);
        return uri;
    }

    /**
     * Retrieves a default theme URI.
     *
     * @returns The default theme URI.
     */
    private getThemesDefaultUri(): string {
        const uri = this.themesDefault;
        return uri;
    }

    /**
     * Retrieves a theme-dependent resource URI.
     *
     * @param resourceName The resource name.
     * @param themeName The theme name.
     *
     * @returns The theme-dependent resource URI.
     */
    public getResourceUri(resourceName: string, themeName: string): string {
        if (typeof themeName === 'undefined') {
            themeName = this.getThemesDefaultUri();
        } else {
            themeName = this.getTheme(themeName);
        }

        const uri = this.urlResolve(themeName, resourceName);
        return uri;
    }

    /**
     * Resolves an url to a base.
     *
     * @param base The base.
     * @param url The url to process.
     *
     * @returns The resolved url.
     */
    public urlResolve(base: string, url: string): string {
        return base + '/' + url;
    }
}

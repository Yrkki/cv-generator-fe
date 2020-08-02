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
      protected imageDataService: ImageDataService,
      protected httpClient: HttpClient) {
        // console.log('Debug: DataService: hostname: ' + location.hostname);
        // for (const key in environment) {
        //     if (environment.hasOwnProperty(key)) {
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
    getCv(): Observable<any> {
        const cv$ = this.httpClient.get<any>(this.cv);

        return cv$;
    }

    /**
     * Retrieves a projects array.
     *
     * @returns The projects array.
     */
    getProjects(): Observable<any> {
        const projects$ = this.httpClient.get<any>(this.projects);

        return projects$;
    }

    /**
     * Retrieves a gantt chart.
     *
     * @returns The gantt chart.
     */
    getGanttChart(): Observable<any> {
        const ganttChart$ = this.httpClient.get<any>(this.ganttChart);

        return ganttChart$;
    }

    /**
     * Retrieves a general timeline.
     *
     * @returns The general timeline.
     */
    getGeneralTimeline(): Observable<any> {
        const generalTimeline$ = this.httpClient.get<any>(this.generalTimeline);

        return generalTimeline$;
    }

    /**
     * Retrieves an entities array.
     *
     * @returns The entities array.
     */
    getEntities(): Observable<any> {
        const entities$ = this.httpClient.get<any>(this.entities);

        return entities$;
    }

    /**
     * Retrieves a UI.
     *
     * @returns The UI.
     */
    getUi(): Observable<any> {
        const ui$ = this.httpClient.get<any>(this.ui);

        return ui$;
    }

    /**
     * Retrieves the app version.
     *
     * @returns The app version.
     */
    getVersion(): Observable<any> {
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
     * Retrieves a project image URI.
     * ~delegate
     *
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The project image URI.
     */
    getProjectProjectImageUri(imageName: string, full: boolean = false): string {
        return this.imageDataService.getProjectProjectImageUri(imageName, full);
    }

    /**
     * Retrieves a project logo image URI.
     * ~delegate
     *
     * @param imageName The image name.
     *
     * @returns The project logo image URI.
     */
    getProjectLogoUri(imageName: string): string {
      return this.imageDataService.getProjectLogoUri(imageName);
    }

    /**
     * Retrieves an accomplishment authority image URI.
     * ~delegate
     *
     * @param imageName The image name.
     *
     * @returns The accomplishment authority image URI.
     */
    getAccomplishmentAuthorityImageUri(imageName: string): string {
      return this.imageDataService.getAccomplishmentAuthorityImageUri(imageName);
    }

    /**
     * Retrieves an accomplishment certificate image URI.
     * ~delegate
     *
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment certificate image URI.
     */
    getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false): string {
      return this.imageDataService.getAccomplishmentCertificateImageUri(imageName, full);
    }

    /**
     * Retrieves an accomplishment certificate logo image URI.
     * ~delegate
     *
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment certificate logo image URI.
     */
    getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false): string {
      return this.imageDataService.getAccomplishmentCertificateLogoImageUri(imageName, full);
    }

    /**
     * Retrieves an accomplishment publication logo image URI.
     * ~delegate
     *
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment publication logo image URI.
     */
    getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false): string {
      return this.imageDataService.getAccomplishmentPublicationLogoImageUri(imageName, full);
    }

    /**
     * Retrieves a background logo image URI.
     * ~delegate
     *
     * @param imageName The image name.
     *
     * @returns The background logo image URI.
     */
    getBackgroundLogoImageUri(imageName: string): string {
      return this.imageDataService.getBackgroundLogoImageUri(imageName);
    }

    /**
     * Retrieves an asset image URI.
     * ~delegate
     *
     * @param imageName The image name.
     *
     * @returns The asset image URI.
     */
    getAssetUri(imageName: string): string {
      return this.imageDataService.getAssetUri(imageName);
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
     * @param resourceName The resource name.
     * @param themeName The theme name.
     *
     * @returns The theme-dependent resource URI.
     */
    getResourceUri(resourceName: string, themeName: string): string {
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
     * @param base The base.
     * @param url The url to process.
     *
     * @returns The resolved url.
     */
    urlResolve(base: string, url: string): string {
        return base + '/' + url;
    }
}

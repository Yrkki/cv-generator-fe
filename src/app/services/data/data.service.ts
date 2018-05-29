import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Data connection service.
 *
 * Retrieves data from a project server.
 */
@Injectable()
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

    /** The images data path. */
    private images: string = this.urlResolve(this.serverEndpointUri, 'images');
    /** The images logos data path. */
    private imagesLogos: string = this.urlResolve(this.images, 'logos');
    /** The images projects data path. */
    private imagesProjects: string = this.urlResolve(this.images, 'projects');
    /** The images assets data path. */
    private imagesAssets: string = this.urlResolve(this.images, 'assets');
    /** The images accomplishments data path. */
    private imagesAccomplishments: string = this.urlResolve(this.images, 'accomplishments');
    /** The images accomplishments authorities data path. */
    private imagesAccomplishmentsAuthorities: string = this.urlResolve(this.imagesAccomplishments, 'authorities');
    /** The images accomplishments certificates data path. */
    private imagesAccomplishmentsCertificates: string = this.urlResolve(this.imagesAccomplishments, 'certificates');
    /** The images accomplishments certificates logos data path. */
    private imagesAccomplishmentsCertificatesLogos: string = this.urlResolve(this.imagesAccomplishmentsCertificates, 'logos');
    /** The images accomplishments publications data path. */
    private imagesAccomplishmentsPublications: string = this.urlResolve(this.imagesAccomplishments, 'publications');
    /** The images accomplishments publications logos data path. */
    private imagesAccomplishmentsPublicationsLogos: string = this.urlResolve(this.imagesAccomplishmentsPublications, 'logos');
    /** The images background data path. */
    private imagesBackground: string = this.urlResolve(this.images, 'background');
    /** The images backgroundLogos data path. */
    private imagesBackgroundLogos: string = this.urlResolve(this.imagesBackground, 'logos');
    /** The images full data path. */
    private imagesFull: string = this.urlResolve(this.images, 'full');

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
     * @constructor
     *
     * @param httpClient The http client for requests to the server.
     */
    constructor(protected httpClient: HttpClient) {
        // console.log('DataService: hostname: ' + location.hostname);
        // for (const key in environment) {
        //     if (environment.hasOwnProperty(key)) {
        //         const element = environment[key];
        //         console.log('DataService: environment.' + key + ': ' + element);
        //     }
        // }
    }

    /**
     * Retrieves a CV.
     *
     * @returns The CV.
     */
    getCv(): Observable<any> {
        const cv = this.httpClient.get<any>(this.cv);

        return cv;
    }

    /**
     * Retrieves a projects array.
     *
     * @returns The projects array.
     */
    getProjects(): Observable<any> {
        const projects = this.httpClient.get<any>(this.projects);

        return projects;
    }

    /**
     * Retrieves a gantt chart.
     *
     * @returns The gantt chart.
     */
    getGanttChart(): Observable<any> {
        const ganttChart = this.httpClient.get<any>(this.ganttChart);

        return ganttChart;
    }

    /**
     * Retrieves a general timeline.
     *
     * @returns The general timeline.
     */
    getGeneralTimeline(): Observable<any> {
        const generalTimeline = this.httpClient.get<any>(this.generalTimeline);

        return generalTimeline;
    }

    /**
     * Retrieves an entities array.
     *
     * @returns The entities array.
     */
    getEntities(): Observable<any> {
        const entities = this.httpClient.get<any>(this.entities);

        return entities;
    }

    /**
     * Retrieves a UI.
     *
     * @returns The UI.
     */
    getUi(): Observable<any> {
        const ui = this.httpClient.get<any>(this.ui);

        return ui;
    }

    /**
     * Retrieves a project image URI.
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The project image URI.
     */
    getProjectProjectImageUri(imageName: string, full: boolean = false): string {
        const uri = this.urlResolve(this.fullConvert(this.imagesProjects, full), imageName);
        return uri;
    }

    /**
     * Retrieves a project logo image URI.
     * @param imageName The image name.
     *
     * @returns The project logo image URI.
     */
    getProjectLogoUri(imageName: string): string {
        const uri = this.urlResolve(this.imagesLogos, imageName);
        return uri;
    }

    /**
     * Retrieves an accomplishment authority image URI.
     * @param imageName The image name.
     *
     * @returns The accomplishment authority image URI.
     */
    getAccomplishmentAuthorityImageUri(imageName: string): string {
        const uri = this.urlResolve(this.imagesAccomplishmentsAuthorities, imageName);
        return uri;
    }

    /**
     * Retrieves an accomplishment certificate image URI.
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment certificate image URI.
     */
    getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false): string {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificates, full), imageName);
        return uri;
    }

    /**
     * Retrieves an accomplishment certificate logo image URI.
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment certificate logo image URI.
     */
    getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false): string {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificatesLogos, full), imageName);
        return uri;
    }

    /**
     * Retrieves an accomplishment publication logo image URI.
     * @param imageName The image name.
     * @param full The full-size-resource switcher request.
     *
     * @returns The accomplishment publication logo image URI.
     */
    getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false): string {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsPublicationsLogos, full), imageName);
        return uri;
    }

    /**
     * Retrieves a background logo image URI.
     * @param imageName The image name.
     *
     * @returns The background logo image URI.
     */
    getBackgroundLogoImageUri(imageName: string): string {
        const uri = this.urlResolve(this.imagesBackgroundLogos, imageName);
        return uri;
    }

    /**
     * Retrieves an asset image URI.
     * @param imageName The image name.
     *
     * @returns The asset image URI.
     */
    getAssetUri(imageName: string): string {
        const uri = this.urlResolve(this.imagesAssets, imageName);
        return uri;
    }

    /**
     * Retrieves a themes holder URI.
     *
     * @returns The themes holder URI.
     */
    getThemesUri(): string {
        const uri = this.themes;
        return uri;
    }

    /**
     * Retrieves a theme URI.
     * @param themeName The theme name.
     *
     * @returns The theme URI.
     */
    getThemeUri(themeName: string): string {
        const uri = this.urlResolve(this.themes, themeName);
        return uri;
    }

    /**
     * Retrieves a default theme URI.
     *
     * @returns The default theme URI.
     */
    getThemesDefaultUri(): string {
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

    /**
     * Match an url to a full-size-resource version.
     * @param uri The uri to match.
     * @param full The full-size-resource switcher request.
     *
     * @returns The full-size-resource uri version.
     */
    fullConvert(uri: string, full: boolean = false): string {
        let base = uri;
        if (full) {
            base = base.replace(this.images, this.imagesFull);
        }
        return base;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {
    private serverEndpointUri = environment.serverEndpointUri;

    private json: string = this.urlResolve(this.serverEndpointUri, 'json');
    private cv: string = this.urlResolveJson(this.json, 'cv');
    private projects: string = this.urlResolveJson(this.json, 'projects');
    private ganttChart: string = this.urlResolveJson(this.json, 'gantt-chart');
    private generalTimeline: string = this.urlResolveJson(this.json, 'general-timeline');
    private entities: string = this.urlResolveJson(this.json, 'entities');
    private ui: string = this.urlResolveJson(this.json, 'ui');

    private images: string = this.urlResolve(this.serverEndpointUri, 'images');
    private imagesLogos: string = this.urlResolve(this.images, 'logos');
    private imagesProjects: string = this.urlResolve(this.images, 'projects');
    private imagesAssets: string = this.urlResolve(this.images, 'assets');
    private imagesAccomplishments: string = this.urlResolve(this.images, 'accomplishments');
    private imagesAccomplishmentsAuthorities: string = this.urlResolve(this.imagesAccomplishments, 'authorities');
    private imagesAccomplishmentsCertificates: string = this.urlResolve(this.imagesAccomplishments, 'certificates');
    private imagesAccomplishmentsCertificatesLogos: string = this.urlResolve(this.imagesAccomplishmentsCertificates, 'logos');
    private imagesAccomplishmentsPublications: string = this.urlResolve(this.imagesAccomplishments, 'publications');
    private imagesAccomplishmentsPublicationsLogos: string = this.urlResolve(this.imagesAccomplishmentsPublications, 'logos');
    private imagesBackground: string = this.urlResolve(this.images, 'background');
    private imagesBackgroundLogos: string = this.urlResolve(this.imagesBackground, 'logos');
    private imagesFull: string = this.urlResolve(this.images, 'full');

    private themes: string = this.urlResolve(this.serverEndpointUri, 'themes');
    private themesDefault: string = this.getTheme('default');
    private getTheme(themeName: string): string { return this.urlResolve(this.themes, themeName); }

    private urlResolveJson(base: string, url: string): string { return this.urlResolve(base, url + '.json'); }

    constructor(protected httpClient: HttpClient) {
        console.log('DataService: hostname: ' + location.hostname);
        for (const key in environment) {
            if (environment.hasOwnProperty(key)) {
                const element = environment[key];
                console.log('DataService: environment.' + key + ': ' + element);
            }
        }
    }

    getCv() {
        const cv = this.httpClient.get<any>(this.cv);

        return cv;
    }

    getProjects() {
        const projects = this.httpClient.get<any>(this.projects);

        return projects;
    }

    getGanttChart() {
        const ganttChart = this.httpClient.get<any>(this.ganttChart);

        return ganttChart;
    }

    getGeneralTimeline() {
        const generalTimeline = this.httpClient.get<any>(this.generalTimeline);

        return generalTimeline;
    }

    getEntities() {
        const entities = this.httpClient.get<any>(this.entities);

        return entities;
    }

    getUi() {
        const ui = this.httpClient.get<any>(this.ui);

        return ui;
    }

    getProjectProjectImageUri(imageName: string, full: boolean = false) {
        const uri = this.urlResolve(this.fullConvert(this.imagesProjects, full), imageName);
        return uri;
    }

    getProjectLogoUri(imageName: string) {
        const uri = this.urlResolve(this.imagesLogos, imageName);
        return uri;
    }

    getAccomplishmentAuthorityImageUri(imageName: string) {
        const uri = this.urlResolve(this.imagesAccomplishmentsAuthorities, imageName);
        return uri;
    }

    getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false) {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificates, full), imageName);
        return uri;
    }

    getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false) {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificatesLogos, full), imageName);
        return uri;
    }

    getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false) {
        const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsPublicationsLogos, full), imageName);
        return uri;
    }

    getBackgroundLogoImageUri(imageName: string) {
        const uri = this.urlResolve(this.imagesBackgroundLogos, imageName);
        return uri;
    }

    getAssetUri(imageName: string) {
        const uri = this.urlResolve(this.imagesAssets, imageName);
        return uri;
    }

    getThemesUri() {
        const uri = this.themes;
        return uri;
    }

    getThemeUri(themeName: string) {
        const uri = this.urlResolve(this.themes, themeName);
        return uri;
    }

    getThemesDefaultUri() {
        const uri = this.themesDefault;
        return uri;
    }

    getResourceUri(resourceName: string, themeName: string) {
        if (typeof themeName === 'undefined') {
            themeName = this.getThemesDefaultUri();
        } else {
            themeName = this.getTheme(themeName);
        }

        const uri = this.urlResolve(themeName, resourceName);
        return uri;
    }

    urlResolve(base: string, url: string) {
        return base + '/' + url;
    }

    fullConvert(uri: string, full: boolean = false): string {
        let base = uri;
        if (full) {
            base = base.replace(this.images, this.imagesFull);
        }
        return base;
    }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    serverEndpointUri = 'http://localhost:3000';

    private cv: string = this.urlResolve(this.serverEndpointUri, 'cv');
    private projects: string = this.urlResolve(this.serverEndpointUri, 'projects');
    private ganttChart: string = this.urlResolve(this.serverEndpointUri, 'gantt-chart');
    private entities: string = this.urlResolve(this.serverEndpointUri, 'entities');
    private ui: string = this.urlResolve(this.serverEndpointUri, 'ui');

    private images: string = this.urlResolve(this.serverEndpointUri, 'images');
    private imagesLogos: string = this.urlResolve(this.images, 'logos');
    private imagesProjects: string = this.urlResolve(this.images, 'projects');
    private imagesAssets: string = this.urlResolve(this.images, 'assets');

    private themes: string = this.urlResolve(this.serverEndpointUri, 'themes');
    private themesDefault: string = this.urlResolve(this.themes, 'default');

    constructor(public http: Http) {}

    getCv() {
        const cv = this.http.get(this.cv)
            .map(res => res.json());

        return cv;
    }

    getProjects() {
        const projects = this.http.get(this.projects)
            .map(res => res.json());

        return projects;
    }

    getGanttChart() {
        const ganttChart = this.http.get(this.ganttChart)
            .map(res => res.json());

        return ganttChart;
    }

    getEntities() {
        const entities = this.http.get(this.entities)
            .map(res => res.json());

        return entities;
    }

    getUi() {
        const ui = this.http.get(this.ui)
            .map(res => res.json());

        return ui;
    }

    getProjectProjectImageUri(imageName: string) {
        const uri = this.urlResolve(this.imagesProjects, imageName);
        return uri;
    }

    getProjectLogoUri(imageName: string) {
        const uri = this.urlResolve(this.imagesLogos, imageName);
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
        }

        const uri = this.urlResolve(themeName, resourceName);
        return uri;
    }

    getPosts() {
        const posts = this.http.get('https://jsonplaceholder.typicode.com/posts')
            .map(res => res.json());

        // var posts = require('../../../Model/posts.json');
        return posts;
    }

    urlResolve(base: string, url: string) {
        return base + '/' + url;
    }
}

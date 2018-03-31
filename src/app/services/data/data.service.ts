import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    // serverEndpointUri: string = "http://localhost:1337";
    serverEndpointUri = 'http://localhost:3000';
    cv: string = this.urlResolve(this.serverEndpointUri, 'cv');
    projects: string = this.urlResolve(this.serverEndpointUri, 'projects');
    ganttChart: string = this.urlResolve(this.serverEndpointUri, 'gantt-chart');
    entities: string = this.urlResolve(this.serverEndpointUri, 'entities');
    images: string = this.urlResolve(this.serverEndpointUri, 'images');
    imagesLogos: string = this.urlResolve(this.images, 'logos');
    imagesProjects: string = this.urlResolve(this.images, 'projects');
    imagesAssets: string = this.urlResolve(this.images, 'assets');
    themes: string = this.urlResolve(this.serverEndpointUri, 'themes');
    themesDefault: string = this.urlResolve(this.themes, 'default');

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

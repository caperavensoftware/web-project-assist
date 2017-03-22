import {inject} from 'aurelia-framework';
import {WebProject} from "./lib/web-project";
import {menuItems, quickItems} from './menu-items';

@inject(WebProject)
export class App {
    router = null;
    project = null;

    constructor(webProject) {
        this.project = webProject;
        this.menuItems = menuItems;
        this.quickItems = quickItems;
    }

    configureRouter(config, router) {
        config.title = 'Web Project Assist';
        config.map([
            {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
            {route: ['project'], name: 'project', moduleId: 'views/project/project', nav: true, title: 'Project'},
            {route: ['new-project'], name: 'new-project', moduleId: 'views/new-project/new-project', nav: true, title: 'New Project'},
            {route: ['screen-templates'], name: 'screen-templates', moduleId: 'views/screen-templates/screen-templates', nav: true, title: 'Screen Templates'}
        ]);

        this.router = router;
    }
}
import {inject} from 'aurelia-framework';
import {WebProject} from "./lib/web-project";
import {menuItems, quickItems} from './menu-items';

const fixPath = require('fix-path');

@inject(WebProject)
export class App {
    router = null;
    webProject = null;

    constructor(webProject) {
        this.webProject = webProject;
        this.menuItems = menuItems;
        this.quickItems = quickItems;
        global.applicationPath = __dirname;

        fixPath();
        // if(process.platform === "darwin") {
        //     process.env.PATH += ":/usr/local/bin";
        // }
        //
        console.log(`electron: ${process.versions.electron}`);
    }

    configureRouter(config, router) {
        config.title = 'Web Project Assist';
        config.map([
            {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
            {route: ['project'], name: 'project', moduleId: 'views/project/project', nav: true, title: 'Project'},
            {route: ['new-project'], name: 'new-project', moduleId: 'views/new-project/new-project', nav: true, title: 'New Project'},
            {route: ['packages'], name: 'packages', moduleId: 'views/packages/packages', nav: true, title: 'Packages'},
            {route: ['screen-templates'], name: 'screen-templates', moduleId: 'views/screen-templates/screen-templates', nav: true, title: 'Screen Templates'},
            {route: ['icons'], name: 'icons', moduleId: 'views/icons/icons', nav: true, title: 'Icons'}
        ]);

        this.router = router;
    }
}
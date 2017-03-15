import {inject} from 'aurelia-framework';
import {WebProject} from './../../lib/web-project';

@inject(WebProject)
export class Welcome {
    constructor(webProject) {
        this.webProject = webProject;
    }

    openFolder() {
        this.webProject.selectFolder();
    }
}
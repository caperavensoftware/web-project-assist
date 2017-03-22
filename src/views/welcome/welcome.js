import {inject} from 'aurelia-framework';
import {WebProject} from './../../lib/web-project';

@inject(WebProject)
export class Welcome {
    constructor(webProject) {
        this.webProject = webProject;
        this.webProject.isMenuVisible = false;
    }

    openFolder() {
        this.webProject.selectFolder();
    }
}
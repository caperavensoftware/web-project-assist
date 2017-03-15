import {inject} from "aurelia-framework";
import {WebProject} from "./../../lib/web-project";

@inject(WebProject)
export class Project {
    webProject;

    constructor(webProject) {
        this.webProject = webProject;
        console.log(this.webProject.currentProjectPath);
    }

    attached() {

    }

    detached() {

    }
}

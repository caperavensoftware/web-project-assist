import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';

export class Project extends ViewBase {

    constructor(element, webProject) {
        super(element, webProject);

        this.model = new ProjectModel();
    }

    createClass() {
        generateClass(this.model.name, this.model.path, this.webProject.currentProjectPath);
    }

    createComponent() {
        generateComponent(this.model.name, this.webProject.currentProjectPath)
    }

    createView() {
        generateView(this.model.name, this.webProject.currentProjectPath)
    }
}

class ProjectModel {
    name = "newItem";
    path = "lib";
}

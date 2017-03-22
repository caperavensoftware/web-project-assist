import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';

export class Project extends ViewBase {
    constructor(element, webProject, router, eventAggregator) {
        super(element, webProject, router, eventAggregator);

        this.model = new ProjectModel();
        this.webProject.isMenuVisible = true;
    }

    attached() {
        const html = '<button click.delegate="sayHello()">Click Me</button>'

        this.eventAggregator.publish("assistant", {
            view: html,
            viewModel: this
        })
    }

    sayHello() {
        console.log("say hellow");
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

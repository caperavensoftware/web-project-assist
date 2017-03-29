import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';
import assistHtml from './project-assist.html!text';
import {NewComponent} from './new-component';

export class Project extends ViewBase {
    newItem = {
        name: "",
        path: "lib"
    };

    constructor(element, webProject, router, eventAggregator) {
        super(element, webProject, router, eventAggregator);

        this.model = new ProjectModel(this.webProject);
        this.webProject.isMenuVisible = true;
    }

    attached() {
        this.eventAggregator.publish("assistant", {
            view: assistHtml,
            viewModel: this
        })
    }

    sayHello() {
        console.log("say hellow");
    }

    createClass() {
        this.createComponentElement.classList.add("closed");
        this.createClassElement.classList.remove("closed");
        this.createViewElement.classList.add("closed");

        this.edtCreateClass.focus();
    }

    hideClass() {
        this.createClassElement.classList.add("closed");
    }

    performCreateClass() {
        if (this.newItem.name.length == 0) {
            return;
        }

        generateClass(this.newItem.name, this.newItem.path, this.webProject.currentProjectPath);
        this.newItem.name = "";
        this.hideClass();
        alert("class created");
    }

    createComponent() {
        this.createComponentElement.classList.remove("closed");
        this.createClassElement.classList.add("closed");
        this.createViewElement.classList.add("closed");

        this.edtCreateComponent.focus();
    }

    performCreateComponent() {
        generateComponent(this.newItem.name, this.webProject.currentProjectPath)
        this.newItem.name = "";
        this.hideComponent();
        alert("component created");
    }

    hideComponent() {
        this.createComponentElement.classList.add("closed");
    }

    createView() {
        this.createComponentElement.classList.add("closed");
        this.createClassElement.classList.add("closed");
        this.createViewElement.classList.remove("closed");

        this.edtCreateView.focus();
    }

    hideView() {
        this.createViewElement.classList.add("closed");
    }

    performCreateView() {
        generateView(this.newItem.name, this.webProject.currentProjectPath);
        this.newItem.name = "";
        this.hideView();
        alert("view created");
    }
}

class ProjectModel {
    name;
    path;

    constructor(webProject) {
        this.name = webProject.name;
        this.path = webProject.currentProjectPath;
    }
}

import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';

export class Project extends ViewBase {
    createClass() {
        generateClass("myClass", "lib", this.webProject.currentProjectPath);
    }

    createComponent() {
        generateComponent("myComponent", this.webProject.currentProjectPath)
    }

    createView() {
        generateView("myView", this.webProject.currentProjectPath)
    }
}

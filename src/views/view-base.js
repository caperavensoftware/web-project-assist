import {inject} from 'aurelia-framework';
import {WebProject} from './../lib/web-project';

@inject(Element, WebProject)
export class ViewBase {
    constructor(element, webProject) {
        this.element = element;
        this.webProject = webProject;
    }

    attached() {
        const focusElement = this.element.querySelector("[autofocus]");

        if (focusElement) {
            focusElement.focus();
        }
    }
}
import {inject} from 'aurelia-framework';
import {WebProject} from './../lib/web-project';
import {Router} from 'aurelia-router';

@inject(Element, WebProject, Router)
export class ViewBase {
    constructor(element, webProject, router) {
        this.element = element;
        this.webProject = webProject;
        this.router = router;
    }

    attached() {
        const focusElement = this.element.querySelector("[autofocus]");

        if (focusElement) {
            focusElement.focus();
        }
    }
}
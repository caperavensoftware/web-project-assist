import {inject} from 'aurelia-framework';
import {WebProject} from './../lib/web-project';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, WebProject, Router, EventAggregator)
export class ViewBase {
    constructor(element, webProject, router, eventAggregator) {
        this.element = element;
        this.webProject = webProject;
        this.router = router;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        const focusElement = this.element.querySelector("[autofocus]");

        if (focusElement) {
            focusElement.focus();
        }
    }
}
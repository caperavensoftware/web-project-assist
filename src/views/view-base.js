import {inject} from 'aurelia-framework';
import {WebProject} from './../lib/web-project';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';

@inject(Element, WebProject, Router, EventAggregator, DialogService)
export class ViewBase {
    constructor(element, webProject, router, eventAggregator, dialogService) {
        this.element = element;
        this.webProject = webProject;
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.dialogService = dialogService;
    }

    attached() {
        const focusElement = this.element.querySelector("[autofocus]");

        if (focusElement) {
            focusElement.focus();
        }
    }
}
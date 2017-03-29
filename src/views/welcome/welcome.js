import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebProject} from './../../lib/web-project';
import assistHtml from './welcome-assist.html!text';

@inject(WebProject, EventAggregator)
export class Welcome {
    constructor(webProject, eventAggregator) {
        this.webProject = webProject;
        this.webProject.isMenuVisible = false;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.eventAggregator.publish("assistant", {
            view: assistHtml,
            viewModel: this
        })
    }

    openFolder() {
        this.webProject.selectFolder();
    }
}
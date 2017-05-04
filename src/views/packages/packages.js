import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/packages.json!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {WebProject} from './../../lib/web-project';

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject)
export class Packages {
    @bindable selectedId;
    @bindable items;
    @bindable busyText;
    @bindable isBusy;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject) {
        this.templateParser = templateParser;
        this.templateParser.propertyPrefix = "model";

        this.dynamicViewLoader = dynamicViewLoader;
        this.eventAggregator = eventAggregator;
        this.webProject = webProject;
        this.busyText = "Please wait while fetching package information";
        this.isBusy = true;

        this.items = this.webProject.packageJson.getInstalledPackages();
        this.webProject.packageJson.getOutdatedPackages(this.items).then(_ => this.isBusy = false);

    }

    attached() {
        this.templateParser.parse(JSON.parse(template)).then(result => {
            this.dynamicViewLoader.load(result, this.genContainer, this);
        });

        this.eventAggregator.publish("assistant", {
            view: "",
            viewModel: this
        });
    }

    detached() {
    }
}
import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/icons.json!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import assistHtml from './icons-assist.html!text';

const SVGO = require('svgo');

@inject(TemplateParser, DynamicViewLoader, EventAggregator)
export class Icons {
    @bindable svgText;

    constructor(templateParser, dynamicViewLoader, eventAggregator) {
        this.templateParser = templateParser;
        this.dynamicViewLoader = dynamicViewLoader;
        this.eventAggregator = eventAggregator;
    }

    svgTextChanged() {
        console.log(this.svgText);
    }

    cleanSVG() {
        const svgo = new SVGO();

        svgo.optimize(this.svgText, result => {
            this.svgText = result.data;
        });
    }

    addNewIcon() {
        console.log("new icon");
    }

    updateIcons() {
        console.log("update icon");
    }

    attached() {
        this.templateParser.parse(JSON.parse(template)).then(result => {
            this.dynamicViewLoader.load(result, this.genContainer, this);
        });

        this.eventAggregator.publish("assistant", {
            view: assistHtml,
            viewModel: this
        })
    }
}

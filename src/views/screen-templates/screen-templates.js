import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import template from './../../../../screen-templates/screen-templates.json!text';
import schemaTemplate from './../../../../templates/schema/screen-template.json.template!text';
import assistHtml from './screen-templates-assist.html!text';

class ScreenTemplatesModel {
    code;
    description;

    constructor() {
        this.code = "A11";
        this.description = "Not area 51"
    }
}

@inject(TemplateParser, DynamicViewLoader, EventAggregator)
export class ScreenTemplates {
    genContainer;
    templateParser;
    model;

    @bindable templateText;

    constructor(templateParser, dynamicViewLoader, eventAggregator) {
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateParser = templateParser;
        this.eventAggregator = eventAggregator;
        this.templateParser.propertyPrefix = "model";
        this.model = new ScreenTemplatesModel();
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

    detached() {
        if (this.previewElement) {
            this.dynamicViewLoader.disposeFor(this.previewElement)
        };

        this.dynamicViewLoader.disposeFor(this.genContainer);
    }

    preview() {
        if (this.editor) {
            this.editor.au["pragma-editor"].viewModel.update();
        }

        this.templateParser.parse(JSON.parse(this.templateText)).then(result => {
            this.dynamicViewLoader.load(result, this.previewElement, this);
        });
    }

    templateTextChanged() {
        this.preview();
    }

    newTemplate() {
        this.templateText = schemaTemplate;
        this.preview();
    }

    commit() {
        alert("save to file");
    }
}
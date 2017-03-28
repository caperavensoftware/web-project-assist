import {inject, bindable} from 'aurelia-framework';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import template from './../../../../screen-templates/screen-templates.json!text';

class ScreenTemplatesModel {
    code;

    constructor() {
        this.code = "A11";
    }
}

@inject(TemplateParser, DynamicViewLoader)
export class ScreenTemplates {
    genContainer;
    templateParser;
    model;

    @bindable templateText;

    constructor(templateParser, dynamicViewLoader) {
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateParser = templateParser;
        this.templateParser.propertyPrefix = "model";
        this.model = new ScreenTemplatesModel();
    }

    attached() {
        this.templateParser.parse(JSON.parse(template)).then(result => {
            this.dynamicViewLoader.load(result, this.genContainer, this);
        });
    }

    detached() {
        if (this.previewElement) {
            this.dynamicViewLoader.disposeFor(this.previewElement)
        };

        this.dynamicViewLoader.disposeFor(this.genContainer);
    }

    preview() {
        this.templateParser.parse(JSON.parse(this.templateText)).then(result => {
            console.log(result);

            this.dynamicViewLoader.load(result, this.previewElement, this);
        });
    }

    templateTextChanged() {
        console.log(this.templateText);
        this.preview();
    }
}
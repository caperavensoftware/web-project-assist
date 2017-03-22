import {inject} from 'aurelia-framework';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import template from './../../../../screen-templates/screen-templates.json!text';

class ScreenTemplatesModel {
    templateText;
}

@inject(TemplateParser, DynamicViewLoader, ScreenTemplatesModel)
export class ScreenTemplates {
    genContainer;
    templateParser;

    constructor(templateParser, dynamicViewLoader, screenTemplatesModel) {
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateParser = templateParser;
        this.templateParser.propertyPrefix = "model";
        this.model = screenTemplatesModel;
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
        this.templateParser.parse(JSON.parse(this.model.templateText)).then(result => {
            this.dynamicViewLoader.load(result, this.previewElement, this);
        });
    }
}
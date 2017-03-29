import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import template from './../../../../screen-templates/screen-templates.json!text';
import schemaTemplate from './../../../../templates/schema/screen-template.json.template!text';
import assistHtml from './screen-templates-assist.html!text';
import {WebProject} from './../../lib/web-project';

const fs = require("fs");

class ScreenTemplatesModel {
    code;
    description;

    constructor() {
        this.code = "A11";
        this.description = "Not area 51"
    }
}

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject)
export class ScreenTemplates {
    genContainer;
    templateParser;
    model;

    @bindable templateText;
    @bindable selectedFile;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject) {
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateParser = templateParser;
        this.eventAggregator = eventAggregator;
        this.webProject = webProject;
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
        if (this.templateText.length > 0) {
            this.templateParser.parse(JSON.parse(this.templateText)).then(result => {
                this.dynamicViewLoader.load(result, this.previewElement, this);
            });
        }
        else
        {
            this.dynamicViewLoader.unload(this.previewElement);
        }
    }

    templateTextChanged() {
        this.preview();
    }

    newViewTemplate() {
        this.templateText = schemaTemplate;
    }

    newListTemplate() {
        alert("not yet defined");
    }

    commit() {
        alert("save to file");
    }

    selectedFileChanged() {
        if (this.selectedFile.length > 0) {
            const projetPath = this.webProject.currentProjectPath ? this.webProject.currentProjectPath : global.applicationPath;
            const temlatePath = `${projetPath}/screen-templates/${this.selectedFile}`;

            fs.readFile(temlatePath, 'utf8', (err, data) => {
                this.templateText = data;
            });
        }
    }
}
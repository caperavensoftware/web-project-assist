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
export class ScreenTemplates{
    genContainer;
    templateParser;
    model;

    @bindable templateText;
    @bindable selectedFile;

    get projectPath() {
        return this.webProject.currentProjectPath ? this.webProject.currentProjectPath : global.applicationPath;
    }

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
        if (this.editor) {
            this.editor.au["pragma-editor"].viewModel.update();
        }

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
        this.selectedFile = null;
    }

    newListTemplate() {
        alert("not yet defined");
        this.selectedFile = null;
    }

    commit() {
        this.editor.au["pragma-editor"].viewModel.update();
        this.templateText = this.editor.au["pragma-editor"].viewModel.value;

        if (this.templateText.trim().length == 0) {
            return;
        }

        if (this.selectedFile) {
            this.saveToFile(`${this.projectPath}/screen-templates/${this.selectedFile}`, this.templateText);
        }
        else
        {
            const dialog = require('electron').remote.dialog;
            const temlatePath = `${this.projectPath}/screen-templates/untitled.json`;

            const file = dialog.showSaveDialog({defaultPath: temlatePath, filters: [{name: "JSON", extensions: ["json"]}]}, (filename) => {
                if (filename) {
                    this.saveToFile(filename, this.templateText);
                }
            });

        }
    }

    saveToFile(fileName, text) {
        fs.writeFile(fileName, text, 'utf8', error => {
            if (error) {
                console.log(error);
            }

            alert(`template saved to ${fileName}`);
        });
    }

    selectedFileChanged() {
        if (this.selectedFile) {
            const temlatePath = `${this.projectPath}/screen-templates/${this.selectedFile}`;

            fs.readFile(temlatePath, 'utf8', (err, data) => {
                this.templateText = data;
            });
        }
    }
}
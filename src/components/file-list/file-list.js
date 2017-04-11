import {customElement, bindable, inject} from 'aurelia-framework';
import {WebProject} from './../../lib/web-project';

const fs = require("fs");

@customElement('file-list')
@inject(Element, WebProject)
export class FileList {
    element = null;
    @bindable folder;
    @bindable selectedFile;
    @bindable selectedId;

    constructor(element, webProject) {
        this.element = element;
        this.webProject = webProject;
    }

    attached() {
        const projetPath = this.webProject.currentProjectPath ? this.webProject.currentProjectPath : global.applicationPath;
        const path = `${projetPath}/${this.folder}`;

        fs.readdir(path, (err, files) => {
            if (files) {
                this.files = files.map((value, index) => {
                    if (value[0] !== "." && value !== "screen-templates.json") {
                        return {
                            name: value,
                            id: index
                        }
                    }
                }).filter(file => {
                    return file != undefined;
                });
            }
        });
    }

    selectedIdChanged() {
        if (this.selectedId) {
            const file = this.files.find(file => {
                return file.id == this.selectedId;
            });

            this.selectedFile = file.name;
        }
        else {
            const selectedItem = this.element.querySelector("[aria-selected]");

            if (selectedItem) {
                selectedItem.removeAttribute("aria-selected");
            }
        }
    }

    selectedFileChanged() {
        if (this.selectedFile == null) {
            this.selectedId = null;
        }
    }
}

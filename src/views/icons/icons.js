import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/icons.json!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import assistHtml from './icons-assist.html!text';
import {WebProject} from './../../lib/web-project';

const fs = require("fs");
const SVGO = require('svgo');

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject)
export class Icons {
    @bindable svgText;
    @bindable selectedId;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject) {
        this.templateParser = templateParser;
        this.dynamicViewLoader = dynamicViewLoader;
        this.eventAggregator = eventAggregator;
        this.webProject = webProject;

        const iconsFilePath = `${this.webProject.currentProjectPath}/src/components/icons/icons.html`;
        this.iconsFile = new IconsFile(iconsFilePath);
        this.iconsFile.load();
    }

    svgTextChanged() {
        console.log(this.svgText);
    }

    selectedIdChanged() {
        const obj = this.iconsFile.icons.find(icon => icon.id == this.selectedId);

        this.svgContainer.setAttribute("viewBox", obj.viewBox);
        this.svgContainer.innerHTML = obj.innerSvg;
        this.svgText = `<svg viewBox="${obj.viewBox}">${obj.innerSvg}</svg>`;
    }

    cleanSVG() {
        const svgo = new SVGO();

        svgo.optimize(this.svgText, result => {
            this.svgText = result.data;

            const svgData = {
                viewBox: getViewBox(this.svgText),
                innerSvg: this.getInnerSVG()
            };

            this.svgContainer.setAttribute("viewBox", svgData.viewBox.split('"')[1]);
            this.svgContainer.innerHTML = svgData.innerSvg;
            this.svgText = this.svgContainer.outerHTML;
        });
    }

    getInnerSVG() {
        const startIndex = this.svgText.indexOf('>') + 1;
        const nextIndex = this.svgText.indexOf('</svg>');

        return this.cleanInnerSVG(this.svgText.substring(startIndex, nextIndex));
    }

    cleanInnerSVG(svg) {
        let result = svg;

        if (result.indexOf('<g opacity=".8" fill="none" fill-rule="evenodd">') !== -1) {
            result = result.replace('<g opacity=".8" fill="none" fill-rule="evenodd">', '');
            result = result.replace('</g>', '');
        }

        if (result.indexOf('fill="') !== -1) {
            const startIndex = result.indexOf('fill="');
            const firstQuote = result.indexOf('"', startIndex);
            const secondQuote = result.indexOf('"', firstQuote + 1);

            const removeFill = result.substring(startIndex, secondQuote + 1);
            result = result.replace(removeFill, '');
        }

        return result;
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

function getViewBox(text) {
    const startIndex = text.indexOf('viewBox');
    const firstQuote = text.indexOf('"', startIndex);
    const secondQuote = text.indexOf('"', firstQuote + 1);

    return text.substring(startIndex, secondQuote);
}

function getId(text) {
    const startIndex = text.indexOf('id');
    const firstQuote = text.indexOf('"', startIndex);
    const secondQuote = text.indexOf('"', firstQuote + 1);

    return text.substring(firstQuote + 1, secondQuote);
}

class IconsFile {
    icons;

    constructor(filePath) {
        this.filePath = filePath;
        this.icons = [];
    }

    load() {
        const result = fs.readFileSync(this.filePath, 'utf8');
        const array = result.split('\n');

        let icon;
        let busyProcessing = false;

        for(let line of array) {
            if (line.indexOf('</symbol') > -1) {
                icon.id = this.icons.length;
                this.icons.push(icon);
                busyProcessing = false;
            }

            if (busyProcessing) {
                icon.innerSvg += line.trim();
            }

            if (line.indexOf('<symbol') > -1) {
                icon = {
                    name: getId(line),
                    viewBox: getViewBox(line).split('"')[1],
                    innerSvg: ""
                };

                busyProcessing = true;
            }
        }
    }

    save() {

    }
}

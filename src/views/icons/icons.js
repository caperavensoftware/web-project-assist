import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/icons.json!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import assistHtml from './icons-assist.html!text';
import {WebProject} from './../../lib/web-project';

const fs = require("fs");
const SVGO = require('svgo');

const iconStates = {
    new: 0,
    edit: 1
};

class Icon {
    name;
    viewBox;
    innerSvg;
    svgText;
    state;

    constructor(name, viewBox, innerSvg, state) {
        this.state = state;
        this.name = name;
        this.viewBox = viewBox;
        this.innerSvg = innerSvg;
        this.svgText = "";
    }
}

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject)
export class Icons {
    @bindable selectedId;
    @bindable model;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject) {
        this.templateParser = templateParser;
        this.templateParser.propertyPrefix = "model";

        this.dynamicViewLoader = dynamicViewLoader;
        this.eventAggregator = eventAggregator;
        this.webProject = webProject;

        const iconsFilePath = `${this.webProject.currentProjectPath}/src/components/icons/icons.html`;
        this.iconsFile = new IconsFile(iconsFilePath);
        this.iconsFile.load();

        this.newIcon();
    }

    selectedIdChanged() {
        this.model = this.iconsFile.icons.find(icon => icon.id == this.selectedId);
        this.model.state = iconStates.edit;

        this.svgContainer.setAttribute("viewBox", this.model.viewBox);
        this.svgContainer.innerHTML = this.model.innerSvg;
        this.svgText = `<svg viewBox="${this.model.viewBox}">${this.model.innerSvg}</svg>`;
    }

    cleanSVG() {
        const svgo = new SVGO();

        svgo.optimize(this.svgText, result => {
            this.svgText = result.data;

            this.model.viewBox = getViewBox(result.data).split('"')[1];
            this.model.innerSvg = this.getInnerSVG(result.data);

            this.svgContainer.setAttribute("viewBox", this.model.viewBox);
            this.svgContainer.innerHTML = this.model.innerSvg;

            this.model.svgText = result.data;
        });
    }

    getInnerSVG(svg) {
        const startIndex = this.svgText.indexOf('>') + 1;
        const nextIndex = this.svgText.indexOf('</svg>');

        return this.cleanInnerSVG(this.svgText.substring(startIndex, nextIndex));
    }

    cleanInnerSVG(svg) {
        let result = svg;

        if (result.indexOf('fill="') !== -1) {
            const startIndex = result.indexOf('fill="');
            const firstQuote = result.indexOf('"', startIndex);
            const secondQuote = result.indexOf('"', firstQuote + 1);

            const removeFill = result.substring(startIndex, secondQuote + 1);
            result = result.replace(removeFill, '');
        }

        return result;
    }

    save() {
        if (this.model.innerSvg && this.model.viewBox && this.model.name != "undefined") {
            if (this.model.state == iconStates.new) {
                this.iconsFile.icons.push(new Icon(this.model.name, this.model.viewBox, this.model.innerSvg, this.model.state))
            }

            this.iconsFile.save();
            this.model.state = iconStates.edit;
        }
    }

    newIcon() {
        this.model = new Icon("undefined", "", "", iconStates.new);

        if (this.svgContainer) {
            this.svgContainer.setAttribute("viewBox", "");
            this.svgContainer.innerHTML = "";
        }

        this.svgText = "";
    }

    attached() {
        this.templateParser.parse(JSON.parse(template)).then(result => {
            this.dynamicViewLoader.load(result, this.genContainer, this);
        });

        this.eventAggregator.publish("assistant", {
            view: assistHtml,
            viewModel: this
        });
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
                icon = new Icon(getId(line), getViewBox(line).split('"')[1], "", iconStates.edit);
                busyProcessing = true;
            }
        }
    }

    save() {
        const list = [];

        for(let icon of this.icons) {
            let symbol = symbolBody.slice(0).replace("__name__", icon.name);
            symbol = symbol.replace("__viewbox__", icon.viewBox);
            symbol = symbol.replace("__paths__", icon.innerSvg);

            list.push(symbol);
        }

        const body = templateBody.slice(0).replace("__symbols__", list.join(""));
        fs.writeFileSync(this.filePath, body);
    }
}

const templateBody =
`
<template>
    <svg style="display: none;">
        __symbols__
    </svg>
</template>
`;

const symbolBody =
`
        <symbol id="__name__" viewBox="__viewbox__">
            __paths__
        </symbol>
`;


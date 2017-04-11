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

            const svgData = {
                viewBox: this.getViewBox(),
                innerSvg: this.getInnerSVG()
            };

            this.svgContainer.setAttribute("viewBox", svgData.viewBox.split('"')[1]);
            this.svgContainer.innerHTML = svgData.innerSvg;
        });
    }

    getViewBox() {
        const startIndex = this.svgText.indexOf('viewBox');
        const firstQuote = this.svgText.indexOf('"', startIndex);
        const secondQuote = this.svgText.indexOf('"', firstQuote + 1);

        return this.svgText.substring(startIndex, secondQuote);
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

        if (result.indexOf('<path d="M872 27h18v18h-18z"/>') !== -1) {
            result = result.replace('<path d="M872 27h18v18h-18z"/>', '');
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

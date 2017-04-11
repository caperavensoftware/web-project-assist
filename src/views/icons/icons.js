import {bindable} from 'aurelia-framework';
import schemaTemplate from './../../../../templates/schema/screen-template.json.template!text';

export class Icons {
    @bindable svgCode;

    svgCodeChanged() {
        console.log(svgCode);
    }

    cleanSVG() {
        console.log("clean svg");
    }

    addNewIcon() {
        console.log("new icon");
    }

    updateIcons() {
        console.log("update icon");
    }
}

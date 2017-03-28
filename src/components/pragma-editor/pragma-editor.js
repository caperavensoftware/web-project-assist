import {customElement, binding, inject} from 'aurelia-framework';
import screenTemplate from './../../../../templates/schema/screen-template.json.template!text';

require("codemirror/mode/javascript/javascript");
require("codemirror/addon/edit/closebrackets");
const codeMirror = require("codemirror");

@customElement('pragma-editor')
@inject(Element)
export class PragmaEditor {
    element = null;
    language;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.setProperty("language", "language", "json");

        const options = {
            mode: this.language,
            lineNumbers: true,
            autoCloseBrackets: true
        };

        if (this.language == "json") {
            options.mode = {
                name: "javascript",
                json: true
            }
        }

        this.editor = codeMirror.fromTextArea(this.codearea, options);
        this.editor.getDoc().setValue(screenTemplate);
    }

    setProperty(attr, prop, defaultValue) {
        const attribute = this.element.getAttribute(attr);

        if (attribute) {
            this[prop] = attribute;
        }
        else {
            this[prop] = defaultValue;
        }
    }
}
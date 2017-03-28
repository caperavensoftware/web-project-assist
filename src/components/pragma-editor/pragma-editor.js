import {customElement, bindable, inject} from 'aurelia-framework';
import screenTemplate from './../../../../templates/schema/screen-template.json.template!text';

require("codemirror/mode/javascript/javascript");
require("codemirror/addon/edit/closebrackets");

require("codemirror/addon/fold/foldcode");
require("codemirror/addon/fold/foldgutter");
require("codemirror/addon/fold/brace-fold");
require("codemirror/addon/fold/indent-fold");
require("codemirror/addon/fold/indent-fold");
require("codemirror/addon/fold/comment-fold");

const codeMirror = require("codemirror");

@customElement('pragma-editor')
@inject(Element)
export class PragmaEditor {
    element = null;

    @bindable language;
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    attached() {
        const options = {
            mode: this.language,
            lineNumbers: true,
            autoCloseBrackets: true,
            matchTags: {bothTags: true},

            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

            extraKeys: {
                "Ctrl-Space": "autocomplete",
                "Ctrl-S": cm => {
                    this.update();
                }
            }
        };

        if (this.language == "json") {
            options.mode = {
                name: "javascript",
                json: true
            }
        }

        this.editor = codeMirror.fromTextArea(this.codearea, options);
        this.value = screenTemplate;
    }

    update() {
        this.value = this.editor.getDoc().getValue();
    }

    valueChanged() {
        this.editor.getDoc().setValue(this.value);
    }
}
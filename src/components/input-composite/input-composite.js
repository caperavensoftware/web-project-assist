import {customElement, bindable, inject} from 'aurelia-framework';
@customElement('input-composite')
@inject(Element)
export class InputComposite {
    @bindable id;
    @bindable label;
    @bindable descriptor;
    @bindable isRequired;
    @bindable hasDescriptor;
    element = null;
    isValid;
    
    constructor(element) {
        this.element = element;
        this.isValid = null;

        this.focusHandler = this.focus.bind(this);
        this.blurHandler = this.blur.bind(this);
        this.keyUpHandler = this.keyUp.bind(this);
    }

    attached() {
        this.labelControl = this.element.querySelector("label");
        const inputSlot = this.element.querySelector("#inputSlot");

        this.input = inputSlot.children[0];
        this.input.id = `${this.id}_input`;
        this.input.style.display = "block";
        this.input.style.width = "100%";
        this.input.addEventListener("focus", this.focusHandler);
        this.input.addEventListener("blur", this.blurHandler);
        this.input.addEventListener("keyup", this.keyUpHandler);

        this.checkValidity();
    }

    detached() {
        this.input.removeEventListener("focus", this.focusHandler);
        this.input.removeEventListener("blur", this.blurHandler);
        this.input.removeEventListener("keyup", this.keyUpHandler);

        this.input = null;
        this.labelControl = null;
    }

    focus() {
        this.labelControl.setAttribute("hasFocus", "true");
    }

    blur() {
        this.labelControl.setAttribute("hasFocus", "false");
    }

    keyUp() {
        this.checkValidity();
    }

    checkValidity() {
        const isValid = this.input.validity && this.input.validity.valid;

        if (isValid != this.isValid) {
            this.isValid = isValid;
            this.labelControl.setAttribute("invalid", !isValid);
        }
    }

    descriptorChanged() {
        this.hasDescriptor = this.descriptor.length > 0;
    }
}

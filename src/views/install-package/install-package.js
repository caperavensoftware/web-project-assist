import {inject} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class InstallPackage {
    constructor(dialogController) {
        this.controller = dialogController;
        this.controller.settings.lock = true;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(model) {
        this.model = model
    }

    detached() {
        // dispose
    }
}
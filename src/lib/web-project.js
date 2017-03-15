import {inject} from "aurelia-framework"
import {Router} from "aurelia-router";
import {PackageJson} from './package.json';

@inject(Router, PackageJson)
export class WebProject {
    errors;
    currentProjectPath;
    packageJson;

    get name() {
        if (this.packageJson.packageObject) {
            return this.packageJson.packageObject.name;
        }
        else
        {
            return "not selected";
        }
    }

    constructor(router, packageJson) {
        this.router = router;
        this.packageJson = packageJson;
    }

    selectFolder() {
        const dialog = require('electron').remote.dialog;
        const folder = dialog.showOpenDialog({ properties: ['openDirectory']});

        if (folder.indexOf(" ") > -1) {
            this.errors = ["folder may not have spaces in the name"];
            return false;
        }

        this.currentProjectPath = folder;

        if (this.packageJson.load(this.currentProjectPath)) {
            this.router.navigate("project");
        }
        else {
            this.router.navigate("new-project");
        }
    }

}

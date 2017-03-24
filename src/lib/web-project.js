import {inject} from "aurelia-framework"
import {Router} from "aurelia-router";
import {PackageJson} from './package.json';

@inject(Router, PackageJson)
export class WebProject {
    errors;
    currentProjectPath;
    packageJson;
    isMenuVisible;

    get name() {
        if (this.packageJson.packageObject) {
            return this.packageJson.packageObject.name;
        }
        else
        {
            return this.getFolderName(this.currentProjectPath);
        }
    }

    constructor(router, packageJson) {
        this.router = router;
        this.packageJson = packageJson;
        this.isMenuVisible = true;
    }

    selectFolder() {
        const dialog = require('electron').remote.dialog;
        const folder = dialog.showOpenDialog({ properties: ['openDirectory']});

        if (this.getFolderName(folder[0]).indexOf(" ") > -1) {
            this.errors = ["folder may not have spaces in the name"];
            return false;
        }

        this.currentProjectPath = folder[0];

        process.chdir(this.currentProjectPath);

        // if (this.packageJson.load(this.currentProjectPath)) {
        //     this.router.navigate("project");
        // }
        // else {
        //     this.router.navigate("new-project");
        // }

        this.router.navigate("new-project");
    }

    getFolderName(path) {
        if (!this.path) {
            return "";
        }

        const paths = this.path.split('/');
        const folder = paths[paths.length -1];

        if (folder.indexOf(" ") > -1) {
            console.error("folder names may not have spaces");
            this.events.emit("show-errors", "folder names may not have spaces");
        }

        return folder;
    }

}

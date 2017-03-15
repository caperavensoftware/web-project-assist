const fs = require("fs");

export class PackageJson {
    packageObject;

    constructor() {

    }

    dispose() {

    }

    load(folder) {
        const path = `${folder}/package.json`;
        const exists = fs.existsSync(path);

        if (!exists) {
            return false;
        }

        this.packageObject = JSON.parse(fs.readFileSync(path, "utf-8"));
        return true;
    }

    saveToFile() {

    }
}
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

    getInstalledPackages() {
        const result = [];

        if (this.packageObject.devDependencies) {
            result.push(new PackageItem("Developer Dependencies", "", PackageType.header));
            this.populatePackageToArray(result, this.packageObject.devDependencies, PackageType.devDependency);
        }

        if (this.packageObject.dependencies) {
            result.push(new PackageItem("Application Dependencies", "", PackageType.header));
            this.populatePackageToArray(result, this.packageObject.dependencies, PackageType.appDependency);
        }

        if (this.packageObject.jspm && this.packageObject.jspm.dependencies) {
            result.push(new PackageItem("UI Dependencies", "", PackageType.header));
            this.populatePackageToArray(result, this.packageObject.jspm.dependencies, PackageType.ui);
        }

        return result;
    }

    populatePackageToArray(array, objectToProcess, type) {
        const names = Object.keys(objectToProcess);

        for (let name of names) {
            array.push(new PackageItem(name, objectToProcess[name], type))
        }
    }
}

export const PackageType = {
    devDependency: 1,
    appDependency: 2,
    ui: 3,
    header: 4
};

export class PackageItem {
    name;
    version;
    type;
    isSelected;

    constructor(name, version, type) {
        this.name = name;
        this.version = version;
        this.type = type;
        this.isSelected = false;
    }
}
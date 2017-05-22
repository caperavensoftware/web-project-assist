const fs = require("fs");
const childProcess = require("child_process");

export class PackageJson {
    packageObject;

    constructor() {

    }

    dispose() {

    }

    load(folder) {
        this.folder = folder;
        return this.loadPackageFile();
    }

    loadPackageFile() {
        const path = `${this.folder}/package.json`;
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
        this.loadPackageFile();

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
            const value = objectToProcess[name];
            const s = value.split("^");
            const version = s.length == 1 ? s[0] : s[1];

            array.push(new PackageItem(name, version.trim(), type))
        }
    }

    getOutdatedPackages(packages) {
        return new Promise((resolve) => {
            const options = {
                cwd: this.folder,
            };

            const command = "npm outdated";
            let result = "";

            const ls = childProcess.exec(command, options, (error, stdout, stderr) => {
                result = stdout;
            });

            ls.on('close', _ => {
                let outdated = result.split(/\r?\n/);

                for(let item of outdated) {
                    let itemDetails = item.split(" ").filter(e => e !== "");

                    const name = itemDetails[0];
                    const wanted = itemDetails[2];
                    const newVersion = itemDetails[3];

                    const p = packages.find(e => e.name == name);
                    if (p) {
                        p.wantedVersion = wanted;
                        p.newVersion = newVersion.trim();
                    }
                }

                resolve();
            });
        });
    };
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
    wantedVersion;
    newVersion;
    type;
    isSelected;

    constructor(name, version, type) {
        this.name = name;
        this.version = version;
        this.newVersion = "";
        this.type = type;
        this.isSelected = false;
    }
}
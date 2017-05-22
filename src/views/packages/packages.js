import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/packages.json!text';
import stylesTemplate from './../../../../templates/project/scss/styles.scss.template!text';
import desktopTemplate from './../../../../templates/project/scss/desktop.scss.template!text';
import mobileTemplate from './../../../../templates/project/scss/mobile.scss.template!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {WebProject} from './../../lib/web-project';
import assist from './packages-assist.html!text';
import {TaskRunner} from './../../lib/task-runner';
import {DialogService} from 'aurelia-dialog';
import {InstallPackage} from './../install-package/install-package';

const EventEmitter = require('events');
const fs = require('fs');

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject, DialogService)
export class Packages {
    @bindable selectedId;
    @bindable items;
    @bindable busyText;
    @bindable isBusy;
    @bindable model;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject, dialogService) {
        this.dialogService = dialogService;
        this.templateParser = templateParser;
        this.templateParser.propertyPrefix = "model";

        this.dynamicViewLoader = dynamicViewLoader;
        this.eventAggregator = eventAggregator;
        this.webProject = webProject;
        this.busyText = "Please wait while fetching package information";
        this.isBusy = true;

        this.items = this.webProject.packageJson.getInstalledPackages();
        this.webProject.packageJson.getOutdatedPackages(this.items).then(_ => this.isBusy = false);

        this.describeHanddler = this.describe.bind(this);
        this.doneHandler = this.done.bind(this);

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on("description", this.describeHanddler);
        this.eventEmitter.on("done", this.doneHandler);
        this.taskRunner = new TaskRunner(this.webProject.currentProjectPath, this.eventEmitter);

        this.model = {
            name: "",
            packageType: "npm",
            dependency: "dev dependency",
            isNpmClient: false
        };
    }

    describe(args) {
        this.busyText = args;
    }

    done() {
        this.isBusy = false;
    }

    attached() {
        this.templateParser.parse(JSON.parse(template)).then(result => {
            this.dynamicViewLoader.load(result, this.genContainer, this);
        });

        this.eventAggregator.publish("assistant", {
            view: assist,
            viewModel: this
        });
    }

    detached() {
    }

    showInstallPackages() {
        this.dialogService.open({viewModel: InstallPackage, model: this.model})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {
                    this.installPackage();
                }
            });
    }

    updateSelected() {
        const selected = this.items.filter(i => i.isSelected);

        this.isBusy = selected.length > 0;

        const tasks = {
            "name": "Install packages",
            "tasks": [

            ]
        };

        for (let item of selected) {
            item.version = item.newVersion;
            item.newVersion = "";
            item.isSelected = false;

            let saveOption = "";
            if (item.type == 1) {
                saveOption = "--save-dev";
            }
            else if (item.type == 2) {
                saveOption = "--save";
            }

            tasks.tasks.push({
                "command": `npm install ${item.name}@latest ${saveOption}`,
                "description": `installing ${item.name}`
            })
        }

        this.taskRunner.runTasks(JSON.stringify(tasks), "installing package")
    }

    removeSelected() {
        const selected = this.items.filter(i => i.isSelected);

        this.isBusy = selected.length > 0;

        const tasks = {
            "name": "Install packages",
            "tasks": [

            ]
        };

        for (let item of selected) {
            let dependency = "";

            if(item.type != 3) {
                dependency = item.type == 1 ? "--save-dev" : "--save";
            }

            let command = `${item.type == 3 ? "jspm" : "npm"} uninstall ${item.name} ${dependency}`;

            tasks.tasks.push({
                "command": command,
                "description": `uninstalling ${item.name}`
            })
        }

        this.taskRunner.runTasks(JSON.stringify(tasks), "uninstalling package");
        this.items = this.items.filter(i => !i.isSelected);
    }

    installNew() {
        this.showInstallPackages();
    }

    installPackage() {
        let dependency = "";
        this.isBusy = true;
        this.busyText = `installing package ${this.model.name}`;

        if (this.model.packageType == "npm") {
            dependency = this.model.dependency == "dev dependency" ? "--save-dev" : "--save";
        }

        const prefix = (this.model.isNpmClient && this.model.packageType == "jspm") ? "npm:" : "";
        const installCommand = `${this.model.packageType} install ${prefix}${this.model.name} ${dependency}`;

        this.taskRunner.execCommand({command: installCommand})
            .then(_ => {
                this.isBusy = false;
                this.items = this.webProject.packageJson.getInstalledPackages();
            });
    }

    installPragmaViews() {
        this.isBusy = true;
        this.busyText = 'installing pragma-views';

        this.taskRunner.execCommand({command: "jspm install npm:pragma-views"})
            .then(_ => {
                this.isBusy = false;
                this.items = this.webProject.packageJson.getInstalledPackages();
                const result = this.items.find(item => item.name == "pragma-views");

                this.saveStyle(`${this.webProject.currentProjectPath}/sass/style.scss`, stylesTemplate, result.version);
                this.saveStyle(`${this.webProject.currentProjectPath}/sass/desktop.scss`, desktopTemplate, result.version);
                this.saveStyle(`${this.webProject.currentProjectPath}/sass/mobile.scss`, mobileTemplate, result.version);
            });
    }

    saveStyle(file, template, version) {
        const result = template.split("__version__").join(version);
        fs.writeFileSync(file, result);
    }
}
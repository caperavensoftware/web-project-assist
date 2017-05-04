import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import template from './../../../../screen-templates/packages.json!text';
import {DynamicViewLoader} from 'pragma-views/lib/dynamic-view-loader';
import {TemplateParser} from 'pragma-views/lib/template-parser';
import {WebProject} from './../../lib/web-project';
import assist from './packages-assist.html!text';
import {TaskRunner} from './../../lib/task-runner';

const EventEmitter = require('events');

@inject(TemplateParser, DynamicViewLoader, EventAggregator, WebProject)
export class Packages {
    @bindable selectedId;
    @bindable items;
    @bindable busyText;
    @bindable isBusy;

    constructor(templateParser, dynamicViewLoader, eventAggregator, webProject) {
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

    }

    installNew() {

    }
}
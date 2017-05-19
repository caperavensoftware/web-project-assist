import {ViewBase} from './../view-base';
import {TaskRunner} from './../../lib/task-runner';
import createProjectJson from './../../../../tasks/create-project.json!text';
import createWebProjectJson from './../../../../tasks/create-web-project.json!text';

const EventEmitter = require('events');

export class NewProject extends ViewBase {
    description;
    details;
    processRunning;

    constructor(element, webProject, router, eventAggregator) {
        super(element, webProject, router, eventAggregator);

        this.processRunning = false;

        this.description = "create process not yet started";
        this.describeHanddler = this.describe.bind(this);
        this.doneHandler = this.done.bind(this);
        this.progressHandler = this.progress.bind(this);

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on("description", this.describeHanddler);
        this.eventEmitter.on("done", this.doneHandler);
        this.eventEmitter.on("progress", this.progressHandler);

        this.taskRunner = new TaskRunner(this.webProject.currentProjectPath, this.eventEmitter);
    }

    detached() {
        this.taskRunner.dispose();
        this.taskRunner = null;
        this.eventEmitter = null;
        this.describeHanddler = null;
    }

    createProject() {
        this.processRunning = true;
        this.taskRunner.runTasks(createProjectJson);
    }

    createWebProject() {
        this.processRunning = true;
        this.taskRunner.runTasks(createWebProjectJson);
    }

    createCordovaProject() {
        console.log("create cordova project");
    }

    createElectronProject() {
        console.log("create electron project");
    }

    cancel() {
        this.router.navigateToRoute("welcome");
    }

    describe(event) {
        this.description = event;
        this.details = "";
    }

    progress(event) {
        this.details = event;
    }

    done() {
        this.router.navigateToRoute("project");
    }
}

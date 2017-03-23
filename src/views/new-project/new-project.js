import {ViewBase} from './../view-base';
import {TaskRunner} from './../../lib/task-runner';
import taskJson from './../../../../tasks/create-project.json!text';

const EventEmitter = require('events');

export class NewProject extends ViewBase {
    description;
    processRunning;

    constructor(element, webProject, router, eventAggregator) {
        super(element, webProject, router, eventAggregator);

        this.processRunning = false;

        this.description = "create process not yet started";
        this.describeHanddler = this.describe.bind(this);
        this.doneHandler = this.done.bind(this);

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on("description", this.describeHanddler);
        this.eventEmitter.on("done", this.doneHandler);

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
        this.taskRunner.runTasks(taskJson);
    }

    cancel() {
        this.router.navigateToRoute("welcome");
    }

    describe(event) {
        this.description = event;
    }

    done() {
        this.router.navigateToRoute("project");
    }
}

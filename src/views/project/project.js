import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';
import {DynamicSchemaItem, DynamicSchemaFieldItem, DynamicDialog} from 'pragma-views';
import {DialogService} from 'aurelia-dialog';
import assistHtml from './project-assist.html!text';
import {TaskRunner} from './../../lib/task-runner';
import buildAll from './../../../../tasks/build-all.json!text';
import runServer from './../../../../tasks/run-server.json!text';

const EventEmitter = require('events');

const schemas = {
    createClass : {
        title: "New Class",
        details: [
            new DynamicSchemaItem("Name", "name", new DynamicSchemaFieldItem("string", "50")),
            new DynamicSchemaItem("Path", "path", new DynamicSchemaFieldItem("string", "50")),
        ],
        model: {
            name: "",
            path: "lib"
        }
    },

    createComponent : {
        title: "New Component",
        details: [
            new DynamicSchemaItem("Name", "name", new DynamicSchemaFieldItem("string", "50"))
        ],
        model: {
            name: "",
        }
    },

    createView : {
        title: "New View",
        details: [
            new DynamicSchemaItem("Name", "name", new DynamicSchemaFieldItem("string", "50"))
        ],
        model: {
            name: "",
        }
    }
};

export class Project extends ViewBase {
    progressText;
    serverActionCaption;

    constructor(element, webProject, router, eventAggregator, dialogService) {
        super(element, webProject, router, eventAggregator, dialogService);

        this.model = new ProjectModel(this.webProject);
        this.webProject.isMenuVisible = true;
        this.webProject.reloadPackage();

        this.doneHandler = this.done.bind(this);
        this.progressHandler = this.progress.bind(this);
        this.processRunningHandler = this.processRunning.bind(this);

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on("done", this.doneHandler);
        this.eventEmitter.on("progress", this.progressHandler);
        this.eventEmitter.on("process-running", this.processRunningHandler);

        this.taskRunner = new TaskRunner(this.webProject.currentProjectPath, this.eventEmitter);
        this.serverActionCaption = "Run Server";
    }

    attached() {
        this.eventAggregator.publish("assistant", {
            view: assistHtml,
            viewModel: this
        })
    }

    detached() {
        this.killServer();
        this.doneHandler = null;

        this.taskRunner.dispose();
        this.taskRunner = null;

        this.model = null;
        this.webProject = null;
        this.progressHandler = null;
        this.processRunningHandler = null;

        this.eventEmitter = null;
    }

    sayHello() {
        console.log("say hellow");
    }

    createClass() {
        this.dialogService.open({viewModel: DynamicDialog, model: schemas.createClass})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {
                    this.performCreateClass(schemas.createClass.model.name, schemas.createClass.model.path);
                    schemas.createClass.model.name = "";
                }
            });
    }

    performCreateClass(name, path) {
        if (name.length == 0) {
            return;
        }

        generateClass(name, path, this.webProject.currentProjectPath, this.taskRunner);
        alert("class created");
    }

    createComponent() {
        this.dialogService.open({viewModel: DynamicDialog, model: schemas.createComponent})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {
                    this.performCreateComponent(schemas.createComponent.model.name);
                    schemas.createComponent.model.name = "";
                }
            });
    }

    performCreateComponent(name) {
        generateComponent(name, this.webProject.currentProjectPath, this.taskRunner);
        alert("component created");
    }

    createView() {
        this.dialogService.open({viewModel: DynamicDialog, model: schemas.createView})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {
                    this.performCreateView(schemas.createView.model.name);
                    schemas.createView.model.name = "";
                }
            });
    }

    performCreateView(name) {
        generateView(name, this.webProject.currentProjectPath, this.taskRunner);
        alert("view created");
    }

    buildAll() {
        this.progressElement.classList.remove("closed");
        this.taskRunner.runTasks(buildAll, "build-all");
    }

    killServer() {
        if (this.serverProcess) {
            this.serverProcess.kill('SIGINT');
            this.serverProcess = null;
            this.serverActionCaption = "Run Server";
        }
    }

    runServer() {
        if (this.serverProcess) {
            this.killServer();
        }
        else {
            this.taskRunner.runTasks(runServer, "run-server");
            this.serverActionCaption = "Stop Server";
        }
    }

    done(args) {
        if (args === "build-all") {
            this.progressElement.classList.add("closed");
            alert("build completed");
        }
    }

    progress(args) {
        this.progressText = args;
    }

    processRunning(args) {
        if (args.id == "run-server") {
            this.serverProcess = args.process;
        }
    }
}

class ProjectModel {
    name;
    path;

    constructor(webProject) {
        this.name = webProject.name;
        this.path = webProject.currentProjectPath;
    }
}

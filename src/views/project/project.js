import {ViewBase} from './../view-base';
import {generateClass, generateComponent, generateView} from './../../lib/code-gen';
import assistHtml from './project-assist.html!text';
import {TaskRunner} from './../../lib/task-runner';
import buildAll from './../../../../tasks/build-all.json!text';
import runServer from './../../../../tasks/run-server.json!text';

const EventEmitter = require('events');

export class Project extends ViewBase {
    newItem = {
        name: "",
        path: "lib"
    };

    progressText;
    serverActionCaption;

    constructor(element, webProject, router, eventAggregator) {
        super(element, webProject, router, eventAggregator);

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
        this.taskRunner = null;
        this.model = null;
        this.webProject = null;
        this.progressHandler = null;
        this.processRunningHandler = null;
    }

    sayHello() {
        console.log("say hellow");
    }

    createClass() {
        this.createComponentElement.classList.add("closed");
        this.createClassElement.classList.remove("closed");
        this.createViewElement.classList.add("closed");

        this.edtCreateClass.focus();
    }

    hideClass() {
        this.createClassElement.classList.add("closed");
    }

    performCreateClass() {
        if (this.newItem.name.length == 0) {
            return;
        }

        generateClass(this.newItem.name, this.newItem.path, this.webProject.currentProjectPath);
        this.newItem.name = "";
        this.hideClass();
        alert("class created");
    }

    createComponent() {
        this.createComponentElement.classList.remove("closed");
        this.createClassElement.classList.add("closed");
        this.createViewElement.classList.add("closed");

        this.edtCreateComponent.focus();
    }

    performCreateComponent() {
        generateComponent(this.newItem.name, this.webProject.currentProjectPath);
        this.newItem.name = "";
        this.hideComponent();
        alert("component created");
    }

    hideComponent() {
        this.createComponentElement.classList.add("closed");
    }

    createView() {
        this.createComponentElement.classList.add("closed");
        this.createClassElement.classList.add("closed");
        this.createViewElement.classList.remove("closed");

        this.edtCreateView.focus();
    }

    hideView() {
        this.createViewElement.classList.add("closed");
    }

    performCreateView() {
        generateView(this.newItem.name, this.webProject.currentProjectPath);
        this.newItem.name = "";
        this.hideView();
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

const exec = require('child_process').exec;
const fs = require("fs");

export class TaskRunner {
    constructor(path, eventEmitter) {
        this.path = path;
        this.eventEmitter = eventEmitter;
    }

    dispose() {
        this.eventEmitter = null;
    }

    runTasks(tasksJson) {
        const tasks = JSON.parse(tasksJson).tasks;

        let i = -1;
        let self = this;

        function processNextTask() {
            i++;

            if (i > tasks.length - 1) {
                return;
            }

            const task = tasks[i];
            if (task.command) {
                self.runCommand(task).then(_ => {
                    processNextTask();
                })
            }
            else
            {
                self.runTask(task).then(_ => {
                    processNextTask();
                })
            }
        }

        processNextTask();
    }

    runCommand(task) {
        return new Promise((resolve, reject) => {
            this.eventEmitter.emit("description", task.description);

            const ls = exec(task.command, {
                cwd: this.path
            }, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }

                console.log(stdout);
            });

            ls.on('close', _ => {
                console.log(`done with: ${task.description}`);
                resolve();
            });
        });
    }

    runTask(task) {
        if (task.task == "template") {
            const source = `${global.applicationPath}/templates/${task.source}`;
            const target = `${this.path}/${task.target}`;
            return this.saveTemplateTo(source, target, task.description);
        }
    }

    saveTemplateTo(fromFile, toFile, description) {
        console.log(fromFile);

        return new Promise((resolve, reject) => {
            this.eventEmitter.emit("description", description);
            fs.createReadStream(fromFile)
                .pipe(fs.createWriteStream(toFile).on("close", _ => {
                    resolve();
                }));
        })
    }
}

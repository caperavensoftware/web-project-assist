const childProcess = require("child_process");
const fs = require("fs");

export class TaskRunner {
    constructor(path, eventEmitter) {
        this.setPath(path);
        this.eventEmitter = eventEmitter;
    }

    dispose() {
        process.env.PATH -= `;${this.path}`;
        process.env.PATH -= `;${this.path}/node_modules/.bin/`;
        this.eventEmitter = null;
    }

    setPath(path) {
        if (this.path) {
            process.env.PATH -= `;${this.path}`;
            process.env.PATH -= `;${this.path}/node_modules/.bin/`;
        }

        this.path = path;
        process.env.PATH += `;${this.path}`;
        process.env.PATH += `;${this.path}/node_modules/.bin/`;
    }

    runTasks(tasksJson, taskProcessId) {
        this.taskProcessId = taskProcessId;
        const tasks = JSON.parse(tasksJson).tasks;

        let i = -1;
        let self = this;

        function processNextTask() {
            i++;

            if (i > tasks.length - 1) {
                return self.eventEmitter.emit("done", taskProcessId);
            }

            const task = tasks[i];
            if (task.command) {
                self.runCommand(task)
                    .then(_ => {
                        processNextTask();
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
            else
            {
                self.runTask(task)
                    .then(_ => {
                        processNextTask();
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        }

        processNextTask();
    }

    runCommand(task) {
        this.eventEmitter.emit("description", task.description);

        if (task.command.indexOf("gulp ") > -1) {
            return this.spawnCommand(task);
        }
        else {
            return this.execCommand(task);
        }
    }

    execCommand(task) {
        return new Promise((resolve, reject) => {
            const options = {
                cwd: this.path,
            };

            const command = task.command;

            const ls = childProcess.exec(command, options, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }

                this.eventEmitter.emit("progress", stdout);
                console.log(stdout);
            });

            ls.on('close', _ => {
                console.log(`done with: ${task.description}`);
                resolve();
            });
        });
    }

    spawnCommand(task) {
        console.log(process.env.PATH);

        return new Promise((resolve, reject) => {
            const command = task.command;

            const gulp = childProcess.spawn(process.env.SHELL || 'powershell', ['-c', command]);

            this.eventEmitter.emit("process-running", {
                id: this.taskProcessId,
                process: gulp
            });

            gulp.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                this.eventEmitter.emit("progress", data);
            });

            gulp.stderr.on('data', (data) => {
              console.log(`stderr: ${data}`);
              reject(data);
            });

            gulp.on('close', (code) => {
              console.log(`child process exited with code ${code}`);
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
        return new Promise((resolve, reject) => {
            this.eventEmitter.emit("description", description);
            fs.createReadStream(fromFile)
                .pipe(fs.createWriteStream(toFile).on("close", _ => {
                    resolve();
                }));
        })
    }
}

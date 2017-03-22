import {ViewBase} from './../view-base';

export class NewProject extends ViewBase {
    createProject() {
        console.log("create project");
    }

    cancel() {
        this.router.navigateToRoute("welcome");
    }
}

export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Web Project Assist';
        config.map([
            {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
            {route: ['project'], name: 'project', moduleId: 'views/project/project', nav: true, title: 'Project'},
            {route: ['new-project'], name: 'new-project', moduleId: 'views/new-project/new-project', nav: true, title: 'New Project'}
        ]);

        this.router = router;
    }
}
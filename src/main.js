export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-menu/pragma-menu',
                'components/main-menu/main-menu',
                'components/input-composite/input-composite'
            );

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}
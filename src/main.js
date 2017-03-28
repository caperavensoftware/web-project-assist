export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-menu/pragma-menu',
                'pragma-views/components/icons/icon.html',
                'pragma-views/components/menu/menu',
                'pragma-views/components/assistant/assistant',
                'pragma-views/components/input-composite/input-composite',
                'components/pragma-editor/pragma-editor'
            );

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}
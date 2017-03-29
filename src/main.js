export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-tabsheet/pragma-tabsheet',
                'pragma-menu/pragma-menu',
                'pragma-views/custom-attributes/selectable',
                'pragma-views/components/icons/icon.html',
                'pragma-views/components/menu/menu',
                'pragma-views/components/assistant/assistant',
                'pragma-views/components/input-composite/input-composite',
                'components/pragma-editor/pragma-editor',
                'components/file-list/file-list'
            );

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}
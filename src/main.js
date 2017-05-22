export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .plugin('aurelia-dialog')
            .globalResources(
                'pragma-tabsheet/pragma-tabsheet',
                'pragma-menu/pragma-menu',
                'pragma-views/custom-attributes/selectable',
                'pragma-views/components/icons/icon.html',
                'pragma-views/components/menu/menu',
                'pragma-views/components/assistant/assistant',
                'pragma-views/components/input-composite/input-composite',
                'pragma-views/dialogs/dynamic-dialog/dynamic-dialog',
                'pragma-views/components/master-list-container/master-list-container',
                'components/pragma-editor/pragma-editor',
                'components/file-list/file-list',
                'components/checkbox.html'
            );

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}
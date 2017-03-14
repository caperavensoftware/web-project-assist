import {customElement, inject, bindable} from 'aurelia-framework';
import {menuItems, quickItems} from './menu-items';
import {Router} from 'aurelia-router';

@customElement('main-menu')
@inject(Element, Router)
export class MainMenu {
    element = null;
    @bindable menuItems = null;

    constructor(element, router) {
        this.element = element;
        this.element = element;
        this.router = router;
        this.menuItems = menuItems.slice(0);
    }

    menuSelected(event) {
        const plan = event.target.dataset.screen || "";

        if (plan.length == 0) {
            return;
        }

        this.router.navigateToRoute(plan);
        this.pragmaMenu.au["pragma-menu"].viewModel.isOpen = false;

        event.preventDefault();
        event.stopPropagation();
    }
}

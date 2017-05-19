import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class TheView {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}
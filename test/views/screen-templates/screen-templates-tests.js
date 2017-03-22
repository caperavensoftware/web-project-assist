
import {expect} from 'chai';
import 'aurelia-polyfills';
import {ScreenTemplates} from './../../../src/views/screen-templates/screen-templates';

describe('ScreenTemplates Tests', function() {
    let screenTemplates;

    beforeEach(function() {
        screenTemplates = new ScreenTemplates ();
    });
    
    it('constructor', function() {
        expect(screenTemplates).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => ScreenTemplates()).to.throw("Cannot call a class as a function");
    });    
})

import {expect} from 'chai';
import 'aurelia-polyfills';
import {MainMenu} from './../../../src/components/main-menu/main-menu';

describe('Main-menu Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new MainMenu ({});
    });
    
    it('constructor', function() {
        expect(MainMenu).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => MainMenu()).to.throw("Cannot call a class as a function");
    });    
});

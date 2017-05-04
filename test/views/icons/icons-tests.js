
import {expect} from 'chai';
import 'aurelia-polyfills';
import {Icons} from './../../../src/views/icons/icons';

describe('Icons Tests', function() {
    let icons;

    beforeEach(function() {
        icons = new Icons ();
    });
    
    it('constructor', function() {
        expect(icons).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Icons()).to.throw("Cannot call a class as a function");
    });    
});

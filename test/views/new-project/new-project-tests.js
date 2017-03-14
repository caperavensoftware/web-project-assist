
import {expect} from 'chai';
import 'aurelia-polyfills';
import {NewProject} from './../../../src/views/new-project/new-project';

describe('NewProject Tests', function() {
    let newProject;

    beforeEach(function() {
        newProject = new NewProject ();
    });
    
    it('constructor', function() {
        expect(newProject).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => NewProject()).to.throw("Cannot call a class as a function");
    });    
})

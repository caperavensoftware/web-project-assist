
import {expect} from 'chai';
import 'aurelia-polyfills';
import {Project} from './../../../src/views/project/project';

describe('Project Tests', function() {
    let project;

    beforeEach(function() {
        project = new Project ();
    });
    
    it('constructor', function() {
        expect(project).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Project()).to.throw("Cannot call a class as a function");
    });    
})
